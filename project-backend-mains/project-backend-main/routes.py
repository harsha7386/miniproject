from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User, File as FileModel, Classroom
from auth import get_current_user
from database import get_db
import io
from fastapi.responses import StreamingResponse

router = APIRouter()

@router.post("/classroom/{classroom_id}/upload/")
def upload_file(
    classroom_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    classroom = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
    if classroom.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="You are not the owner of this classroom")
    file_data = file.file.read()
    new_file = FileModel(
        filename=file.filename,
        file_data=file_data,
        uploaded_by=current_user.id,
        classroom_id=classroom_id
    )
    db.add(new_file)
    db.commit()
    db.refresh(new_file)
    return {"message": "File uploaded successfully"}

@router.get("/classroom/{classroom_id}/files/")
def get_files(classroom_id: int, db: Session = Depends(get_db)):
    files = db.query(FileModel).filter(FileModel.classroom_id == classroom_id).all()
    return [{"id": file.id, "filename": file.filename, "uploaded_by": file.uploaded_by} for file in files]

@router.get("/files/{file_id}/download/")
def download_file(file_id: int, db: Session = Depends(get_db)):
    file = db.query(FileModel).filter(FileModel.id == file_id).first()
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    return StreamingResponse(io.BytesIO(file.file_data), media_type="application/octet-stream",
                             headers={"Content-Disposition": f"attachment; filename={file.filename}"})

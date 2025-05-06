function MessageAlert({ messages }) {
    return (
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`alert alert-${msg.type} alert-dismissible text-center`} role="alert">
            {msg.text}
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
          </div>
        ))}
      </div>
    );
  }
  
  export default MessageAlert;
  
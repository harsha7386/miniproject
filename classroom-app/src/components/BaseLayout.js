import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const BaseLayout = ({ children, isLoggedIn, setIsLoggedIn  }) => {
  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="content w-100  mb-2  " style={{paddingLeft:"280px"}}>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <div className="container  mt-0" style={{ marginBottom: "0px "}}>{children}</div>
      </div>
    </div>
  );
};

export default BaseLayout;

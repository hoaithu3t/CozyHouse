import React, { useState, useContext, useEffect } from "react";
// import { Link } from "react-router-dom";
// import withAuth from "../../hoc/authHoc";
// import authCtx from "../../contexts/auth";
// import ReactLoading from "react-loading";
// import { useAsync } from "react-hook-async";
// import "../../scss/dashboard.scss";
import cover from "./cover.png";
// import { Container } from "react-bootstrap";

// const style = {
//   fontSize: "24px",
//   color: "lightPink",
//   margin: "10px",
// };
// linear-gradient(96.98deg, #DB647E 0%, #FDA2A9 100%)
const Dashboard = () => {
  return (
    <>
      <img src= {cover} width = "100%" />   
      <div className="container">
        {/* loai nha */}
        <div className="row p-3 m-4 text-white text-center" style = {{backgroundColor: "#DB647E" , borderRadius: "10px"}}>
          <div className ="col-sm">
            Chung cư
          </div>
          <div className="col-sm">
            Nhà nguyên căn
          </div>
          <div className="col-sm">
            Nhà trọ
          </div>
        </div>

        {/* Khu vuc */}
        <div>
          <h3>Quanh đây</h3>
          <div className="row p-3 m-4 text-white text-center" >            
            <div className ="col-sm-3" style = {{backgroundColor: "#FA9CA5" , borderRadius: "10px"}}>
              Chung cư
            </div>
            <div className ="col-sm-3" style = {{backgroundColor: "#FA9CA5" , borderRadius: "10px"}}>
              Nhà nguyên căn
            </div>
            <div className="col-sm-3" style = {{backgroundColor: "#FA9CA5" , borderRadius: "10px"}}>
              Nhà trọ
            </div>
        </div>
        </div>
      
      </div>

      
    </>
  
  )
}
export default Dashboard;

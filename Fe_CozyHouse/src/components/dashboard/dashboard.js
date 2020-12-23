import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// import withAuth from "../../hoc/authHoc";
// import authCtx from "../../contexts/auth";
// import ReactLoading from "react-loading";
// import { useAsync } from "react-hook-async";
import "../../scss/dashboard.scss";
import "../../css/index.css";
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
      <div className = "search-home">
        <img src={cover} width="100%" />
        <div className = "btn-search-home">
          <div className="title_search_home">Phòng trọ gần nhà</div>
          <button className = "btn" >
            <Link to="/room_list" className="p-2 io discover" block>
              <span className ="explore">
                Khám phá ngay
              </span>
            </Link>
          </button>
        </div>
        
      </div>
      
      <div className="container">

        {/* loai nha */}
        <div className="row p-3 m-4 text-white text-center" style = {{backgroundColor: "#DB647E" , borderRadius: "10px"}}>
          <div className ="col-sm-2 col-xl">
          <i class="fas fa-home icon-image"></i>
            Nhà trọ
          </div>
          <div className="col-sm col-xl">
          <i class="far fa-building icon-image"></i>
            Chung cư mini
          </div>
          <div className="col-sm col-xl">
          <i class="fas fa-laptop-house icon-image"></i>
            Nhà nguyên căn
          </div>
          <div className="col-sm-4 col-xl">
          <i class="fas fa-city icon-image"></i>
            Chung cư nguyên căn
          </div>
        </div>

        {/* Khu vuc */}
        <div>
          <div className= "near"><h3>Quanh đây</h3></div>
          <div className="row p-3 m-4 text-white text-center" >            
            <div className ="col m-2 p-3" style = {{backgroundColor: "#FA9CA5" , borderRadius: "10px"}}>
              Nhà trọ
            </div>
            <div className ="col m-2 p-3" style = {{backgroundColor: "#FA9CA5" , borderRadius: "10px"}}>
              Chung cư mini
            </div>
            <div className="col m-2 p-3" style = {{backgroundColor: "#FA9CA5" , borderRadius: "10px"}}>
              Nhà nguyên căn
            </div>
            <div className="col m-2 p-3" style = {{backgroundColor: "#FA9CA5" , borderRadius: "10px"}}>
              Chung cư nguyên căn
            </div>
          </div>
          <div className="row p-3 m-4 text-white text-center" >            
            <div className ="col m-2 p-3" style = {{backgroundColor: "#FA9CA5" , borderRadius: "10px"}}>
              Nhà trọ
            </div>
            <div className ="col m-2 p-3" style = {{backgroundColor: "#FA9CA5" , borderRadius: "10px"}}>
              Chung cư mini
            </div>
            <div className="col m-2 p-3" style = {{backgroundColor: "#FA9CA5" , borderRadius: "10px"}}>
              Nhà nguyên căn
            </div>
            <div className="col m-2 p-3" style = {{backgroundColor: "#FA9CA5" , borderRadius: "10px"}}>
              Chung cư nguyên căn
            </div>
          </div>
        </div>

        {/* Tiêu biểu */}
        <div>
          <div className="best"><h3>Phòng được xem nhiều nhất</h3></div>
          {
            
          }
        </div>
      
      </div>

      
    </>
  
  )
}
export default Dashboard;

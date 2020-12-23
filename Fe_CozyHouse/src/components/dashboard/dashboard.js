import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import * as actions from '../../redux/rooms/roomsActions';
import {RoomItem} from '../../components/room_list'
import "../../scss/dashboard.scss";
import "../../css/index.css";
import cover from "./cover.png";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {  allRooms } = useSelector(
    (state) => ({
      allRooms: state.rooms.allRooms,
    }),
    shallowEqual,
  );

 const history = useHistory()
  const remoteToDetail = (id) => {
    history.push(`/${id}/roomDetail`);
  }    

  useEffect(() => {
    dispatch(actions.fetchRoomsManyView());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div  className="row p-3 m-4 text-white text-center" style = {{backgroundColor: "#DB647E" , borderRadius: "10px"}}>
          
          <div onClick= {() => remoteToDetail()} style = {{ cursor: "pointer"}} className ="col-sm-2 col-xl ">
          <i class="fas fa-home"></i>
            Nhà trọ
          </div>
          <div onClick= {() => remoteToDetail()} style = {{ cursor: "pointer"}} className="col-sm col-xl">
          <i class="far fa-building"></i>
            Chung cư mini
          </div>
          <div onClick= {() => remoteToDetail()} style = {{ cursor: "pointer"}} className="col-sm col-xl">
          <i class="fas fa-laptop-house"></i>
            Nhà nguyên căn
          </div>
          <div onClick= {() => remoteToDetail()} style = {{ cursor: "pointer"}} className="col-sm-4 col-xl">
          <i class="fas fa-city"></i>

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
          <div className="best">
            <h3>Phòng được xem nhiều nhất</h3>
          </div>
          <div className = "row">          
          {
            allRooms && allRooms.map(room => {
                      var {_id, address, area, numberOfRoom, price, title } = room;
                      return (                        
                        <RoomItem 
                        title={title}
                        location={address}
                        price={price}
                        area={area}
                        number_of_room={numberOfRoom}
                        onClick = {() => remoteToDetail(_id)}
                        />
                      )
                    }
                    )
            }
            </div>
        </div>
      
      </div>

      
    </>
  
  )
}
export default Dashboard;

import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/rooms/roomsActions';
import Carousel from 'react-bootstrap/Carousel'
import './roomDetail.css'
export function RoomDetail({
  history,
  match: {
    params: { id },
  },
}) {

  
    const dispatch = useDispatch();
    const { actionsLoading, roomForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.rooms.actionsLoading,
      roomForEdit: state.rooms.roomForEdit,
    }),
    
    shallowEqual,
  );

   useEffect(() => {
    // server call for getting Room by id
    dispatch(actions.fetchRoom(id));
  }, [id, dispatch]);
  console.log(roomForEdit)
  return (
    <>
     <Carousel style= {{width: "50%" , marginLeft: "25%", overflow: "hidden", height: "600px", borderRadius : "10px"}}>
  <Carousel.Item >
    <img
      className="d-block "
      src= {process.env.REACT_APP_API_DOMAIN + "/" + roomForEdit?.img[0]}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src= {process.env.REACT_APP_API_DOMAIN + "/" + roomForEdit?.img[1]}
      alt="Third slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src= {process.env.REACT_APP_API_DOMAIN + "/" + roomForEdit?.img[2]}
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>

    <div style= {{marginLeft : "25%"}}>
      <div className="content">
        <div className="header-content">
          <div className="post-title">
            <span className="title" >{roomForEdit?.title}</span>
            <span className="room-infor">- {roomForEdit?.area} m2 - {roomForEdit?.numberOfRoom} phòng </span>
            <span className="nearby-place">Gần {roomForEdit?.nearbyPlace}</span>
            <p className="price">{roomForEdit?.price}₫ / tháng</p>
            <p className="address"> {roomForEdit?.address}</p>
          </div>
          <div className="user">
            <i class=" far fa-user"></i> 
            <p> {roomForEdit?.username} </p>         
          </div>
        </div>
        <div className="decription">
           <p>{roomForEdit?.description}</p>
        </div>
        <div className="utility">
            <div className="item">
              <i class="fas fa-lg	 fa-snowflake"></i>
              <p>{roomForEdit?.conditioner ? "Có" : "Không"}</p>
            </div> 
            <div className="item">
             <i class="fas fa-bath fa-lg"></i>             
             <p>{roomForEdit?.bathroom ? "Dùng chung" : "Dùng riêng"}</p>
            </div> 
            <div className="item">
              <i class="fas fa-lg	 fa-snowflake"></i>
              <p>{roomForEdit?.balcony ? "Có" : "Không"}</p>
            </div> 
            <div className="item">
            <i class="fas fa-utensils fa-lg+"></i>              
            <p>{roomForEdit?.kitchen == 0 ? "Dùng chung" :(roomForEdit?.kitchen == 1 ? "Dùng riêng" : "Không có")}</p>
            </div>
            <div className="item">
              <i class="fas fa-bolt fa-lg"></i>           
              <p>{roomForEdit?.electricWaterPrice ? "Điện nước giá dân" : "Điện nước giá kinh doanh"}</p>
            </div>
            <div className="item">
              <i class="fas fa-temperature-high fa-lg"></i>           
              <p>{roomForEdit?.electricWaterPrice ? "Có bính nóng lạnh" : "Không có bình nóng lạnh"}</p>
            </div>
        </div>


        
      </div>
     
    </div>
     làm theo biến "roomForEdit"


    </>
  );
}

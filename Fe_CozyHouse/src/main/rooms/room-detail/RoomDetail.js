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
      src="https://a0.muscache.com/im/pictures/b277a9ff-c847-44b5-989b-8384c0de2c32.jpg?im_w=720"
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://a0.muscache.com/im/pictures/6cbb2117-7270-4f20-8629-de5978783a29.jpg?im_w=720"
      alt="Third slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://a0.muscache.com/im/pictures/15b0bfd1-cea5-481c-a64b-acf6bac1e43b.jpg?im_w=720"
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>

    <div style= {{marginLeft : "25%"}}>
      <div className="content">
        <div className="header-content">
          <div className="post-title">
            <h1 >Penthouse trên Đà Lạt</h1>
            <p> 86A/381/Nguyễn Khang - 60m2 - 2 Phòng - Chung cư mini </p>
            <p>3000000đ / tháng</p>
          </div>
          <div className="user">
            <img className= "avatar" src= "https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/126200109_2722724684647245_6075582107124202458_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=E90UoCpNlhkAX_IeJvz&_nc_ht=scontent.fhan5-5.fna&oh=a3df3dfd325537aa67201513b735f946&oe=600896A8" />
          </div>
        </div>
        <div className="main">
          <div className= "item">
            <i class="fas fa-money-bill-wave"></i>
            <p> </p>
          </div>
        </div>


        
      </div>
     
    </div>
     làm theo biến "roomForEdit"


    </>
  );
}

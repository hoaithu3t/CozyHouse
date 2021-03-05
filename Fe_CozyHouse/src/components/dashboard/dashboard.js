import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import * as actions from "../../redux/rooms/roomsActions";
import { RoomItem } from "../../components/room_list";
import "../../scss/dashboard.scss";
import "../../css/index.css";
import cover from "./cover.png";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allRooms } = useSelector(
    (state) => ({
      allRooms: state.rooms.allRooms,
    }),
    shallowEqual
  );

  const history = useHistory();
  const remoteToDetail = (id) => {
    history.push(`/${id}/roomDetail`);
  };

  useEffect(() => {
    dispatch(actions.fetchRoomsManyView());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="search-home">
        <img src={cover} width="100%" alt="" />
        <div className="btn-search-home">
          <div className="title_search_home">Room near the house</div>
          <button className="btn">
            <Link to="/room_list" className="p-3 io discover" block>
              <span className="explore">Discover now {">>"}</span>
            </Link>
          </button>
        </div>
      </div>

      <div className="container my-5">
        {/* loai nha */}
        <div
          className="row p-3 m-4 text-white text-center"
          style={{ backgroundColor: "#DB647E", borderRadius: "10px" }}
        >
          <div
            onClick={() => remoteToDetail()}
            style={{ cursor: "pointer" }}
            className="col-sm-2 col-xl "
          >
            <i class="fas fa-home"></i>
            Hostel
          </div>
          <div
            onClick={() => remoteToDetail()}
            style={{ cursor: "pointer" }}
            className="col-sm col-xl"
          >
            <i class="far fa-building"></i>
            Mini apartment
          </div>
          <div
            onClick={() => remoteToDetail()}
            style={{ cursor: "pointer" }}
            className="col-sm col-xl"
          >
            <i class="fas fa-laptop-house"></i>
            House
          </div>
          <div
            onClick={() => remoteToDetail()}
            style={{ cursor: "pointer" }}
            className="col-sm-4 col-xl"
          >
            <i class="fas fa-city"></i>
            Luxury apartment
          </div>
        </div>

        {/* Phòng xem nhiều nhất */}
        <div className="best mt-5">
          <h3>Most viewed room</h3>
          <div className="row p-3 m-4 text-white text-center">
            {allRooms &&
              allRooms.map((room) => {
                var {
                  _id,
                  address,
                  area,
                  numberOfRoom,
                  price,
                  title,
                  img,
                } = room;
                return (
                  <RoomItem
                    title={title}
                    location={address}
                    price={price}
                    area={area}
                    number_of_room={numberOfRoom}
                    onClick={() => remoteToDetail(_id)}
                    img={img}
                  />
                );
              })}
          </div>
        </div>

        {/* Phòng nhiều lượt thích nhất */}
        <div className="best">
          <h3>The rooms get a lot of likes</h3>
          <div className="row p-3 m-4 text-white text-center">
            {allRooms &&
              allRooms.map((room) => {
                var {
                  _id,
                  address,
                  area,
                  numberOfRoom,
                  price,
                  title,
                  img,
                } = room;
                return (
                  <RoomItem
                    title={title}
                    location={address}
                    price={price}
                    area={area}
                    number_of_room={numberOfRoom}
                    onClick={() => remoteToDetail(_id)}
                    img={img}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;

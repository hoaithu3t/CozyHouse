import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/rooms/roomsActions";
import Carousel from "react-bootstrap/Carousel";
import { Container } from "react-bootstrap";
import "./roomDetail.css";

export function RoomDetail({
  history,
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  const { roomForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.rooms.actionsLoading,
      roomForEdit: state.rooms.roomForEdit,
    }),

    shallowEqual
  );
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    // server call for getting Room by id
    dispatch(actions.fetchRoom(id));
  }, [id, dispatch]);
  const TypeOfRoom = [
    "phòng trọ",
    "chung cư mimi",
    "nhà nguyên căn",
    "chung cư nguyên căn",
  ];
  const Kitchen = ["Khu bếp riêng", "Khu bếp chung", "không nấu ăn"];
  return (
    <Container id="room-detail" className="my-4">
      <h1 className="mb-5 text-center">{roomForEdit?.title}</h1>

      {/* Image room */}
      <Carousel
        style={{
          overflow: "hidden",
          height: "500px",
          borderRadius: "10px",
        }}
      >
        {roomForEdit?.img.map((_, index) => (
          <Carousel.Item>
            <img
              className="d-block "
              src={
                process.env.REACT_APP_API_DOMAIN + "/" + roomForEdit?.img[index]
              }
              height="500px"
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div>
        <div className="d-flex">
          <h1 className="mb-5">{roomForEdit?.title}</h1>
          <i
            onClick={() => setIsLike(!isLike)}
            style={{ color: `${isLike ? "pink" : "black"}`, padding: "20px" }}
            class="fas fa-heart"
          ></i>
        </div>

        <div>
          <p className="font-weight-bold my-2">Mô tả:</p>
          <p className="ml-3">- {roomForEdit?.description}</p>
        </div>
        <div>
          <p className="font-weight-bold my-2">Địa chỉ:</p>
          <p className="ml-3">- {roomForEdit?.address}</p>
        </div>
        <div>
          <p className="font-weight-bold my-2">
            Địa điểm công cộng xung quanh:
          </p>
          <p className="ml-3">- {roomForEdit?.nearbyPlace}</p>
        </div>
        <div>
          <p className="font-weight-bold my-2">Loại phòng:</p>
          <p className="ml-3">- {TypeOfRoom[roomForEdit?.typeOfRoom]}</p>
        </div>
        <div>
          <p className="font-weight-bold my-2">Số lượng phòng:</p>
          <p className="ml-3">- {roomForEdit?.numberOfRoom}</p>
        </div>
        <div>
          <p className="font-weight-bold my-2">Giá phòng:</p>
          <p className="ml-3">- {roomForEdit?.price}</p>
        </div>
        <div>
          <p className="font-weight-bold my-2">Diện tích:</p>
          <p className="ml-3">- {roomForEdit?.area}</p>
        </div>
        <div>
          <p className="font-weight-bold my-2">Phòng tắm:</p>
          {roomForEdit?.bathroom && <p className="ml-3">- Khép kín</p>}
          {roomForEdit?.electricWaterHeater && (
            <p className="ml-3">- Có nóng lạnh</p>
          )}
        </div>
        <div>
          <p className="font-weight-bold my-2">Phòng bếp:</p>
          <p className="ml-3">- {Kitchen[roomForEdit?.kitchen]}</p>
        </div>
        {roomForEdit?.conditioner && <p>- Có điều hòa</p>}
        {roomForEdit?.balcony && <p>- Có ban công</p>}
        {roomForEdit?.electricWaterPrice && <p>- Điện nước giá dân</p>}
        {roomForEdit?.otherUtility && (
          <div>
            <p className="font-weight-bold my-2">Tiện ích khác:</p>
            <p className="ml-3">- {roomForEdit?.otherUtility}</p>
          </div>
        )}
        <p className="font-weight-bold my-2 text-right">
          Người đăng bài: {roomForEdit?.username}
        </p>
      </div>
    </Container>
  );
}

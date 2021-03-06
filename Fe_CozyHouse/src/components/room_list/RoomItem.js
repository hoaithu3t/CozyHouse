import React, { Component } from "react";
import "./RoomItem.css";
class RoomItem extends Component {
  render() {
    var {
      title,
      location,
      price,
      area,
      number_of_room,
      onClick,
      img,
    } = this.props;
    return (
      <div className="col-3">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a style={{ cursor: "pointer" }} onClick={onClick} className="m-2">
          <img
            src={process.env.REACT_APP_API_DOMAIN + "/" + img[0]}
            width="230px"
            height="154px"
            alt=""
          />
          <div className="post-title">
            <p className="room-information">
              {" "}
              {location} - {area}m2 - {number_of_room} phòng
            </p>
            <p className="post-name">{title}</p>
            <p className="price"> {price}₫ / Tháng</p>
          </div>
        </a>
      </div>
    );
  }
}

export default RoomItem;

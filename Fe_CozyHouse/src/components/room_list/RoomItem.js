import React, { Component } from 'react';
import roomImg from './RoomImg.png';
import './RoomItem.css';

class RoomItem extends Component {
    render() {
        var {title, location, price, area, number_of_room} = this.props;
        return(
            <div className="post-container">
                <img src = {roomImg} width = "245px" height = "154px"/>
                <div className="post-title">
                    <p className="room-information"> {location} - {area}m2 - {number_of_room} Phòng</p>
                    <p className="post-name">{title}</p>
                    <p className="price"> {price}₫ / Tháng</p>



            
                </div>
            </div>
        );
    }

};

export default RoomItem;


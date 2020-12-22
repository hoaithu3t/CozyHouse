import React, { Component } from 'react';
import RoomItem from './RoomItem';
import data from './room-list.json';
class RoomList extends Component {

    render() {
        var RoomList = data.map(room => {
            var {title, location, price, area, number_of_room} = room;
            return(
                <RoomItem
                    title={title}
                    location={location}
                    price={price}
                    area={area}
                    number_of_room={number_of_room}

                />
            )
        }
           
        )
        // console.log(data);
        return (
            <div>
                <h2>Phòng tiêu biểu</h2>
                <div className="item-list-container">
                {RoomList}

                </div>
            </div>
        );
    }
};

export default RoomList;

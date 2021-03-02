// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/rooms/roomsActions';
import { isEqual } from 'lodash';
import { Formik } from 'formik';
import {RoomItem} from '../../../components/room_list'
import { Link } from "react-router-dom";
import '../../../css/index.css'
import { useHistory } from "react-router-dom";
export function RoomsList() { 

 

  const { roomFilter } = useSelector(
    (state) => ({      
      roomFilter: state.rooms.entities,
    }),
    shallowEqual,
  );
  const [queryParams, setQueryParams] = useState({
    filter: {
      title: '',
      address: '',
      nearbyPlace: '',
      price: '',
      area: ''
    },
    sortOrder: 'ASC', // ASC|DESC
    sortField: 'Name',
    pageNumber: 1,
    pageSize: 10,
  })
  // Rooms Redux state
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(actions.fetchRoomsFilter(queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const prepareFilter = (queryParams, values) => {
    const { title, address, nearbyPlace, price, area } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};

    // Filter by titleRoom
    filter.model = title;
    // Filter by Name
    if (title) {
      filter.title = title;
    } 
    else {
      filter.title = "";
    }
    if (address) {
      filter.address = address;
    } 
    else {
      filter.address = "";
    }

    filter.address = address  ? address : "";
    filter.nearbyPlace = nearbyPlace ? nearbyPlace : "";
    filter.price = price ? price : "";
    filter.area = address ? area : "";
    newQueryParams.filter = filter;
    return newQueryParams;
  };

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(queryParams, values);
    if (!isEqual(newQueryParams, queryParams)) {
      newQueryParams.pageNumber = 1;

      // update list by queryParams
      setQueryParams(newQueryParams);
    }
  };
  const history = useHistory()
  const remoteToDetail = (id) => {
    history.push(`/${id}/roomDetail`);
  }

  return (
    <>
      {/* filter */}    
       <Formik
        initialValues={{
          title: '',
          address: '',
          nearbyPlace: '',
          price: '',
          area: ''
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}>
        {({
          values,
          handleSubmit,
          handleBlur,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row m-5">
              {/* title */}
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder= "Tiêu đề"
                  onBlur={handleBlur}
                  value={values.title}
                  onChange={(e) => {
                    setFieldValue('title', e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Tìm kiếm theo tiêu đề</b>
                </small>
              </div>

              {/* address */}
               <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder= "Địa chỉ"
                  onBlur={handleBlur}
                  value={values.address}
                  onChange={(e) => {
                    setFieldValue('address', e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Tìm kiếm theo địa chỉ</b>
                </small>
              </div>
              {/* nearbyPlace */}
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  name="nearbyPlace"
                  placeholder= "Điểm công cộng"
                  onBlur={handleBlur}
                  value={values.nearbyPlace}
                  onChange={(e) => {
                    setFieldValue('nearbyPlace', e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Tìm kiếm theo điểm dông cộng</b>
                </small>
              </div>

              {/* price
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  placeholder= "Giá phòng"
                  onBlur={handleBlur}
                  value={values.price}
                  onChange={(e) => {
                    setFieldValue('price', e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Tìm kiếm theo giá phòng</b>
                </small>
              </div> */}

              {/* typeOfRoom */}            
              {/* <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  name="typeOfRoom"
                  placeholder= "Kiểu phòng"
                  onBlur={handleBlur}
                  value={values.typeOfRoom}
                  onChange={(e) => {
                    setFieldValue('typeOfRoom', e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Tìm kiếm theo kiểu phòng</b>
                </small>
              </div> */}

              {/* area */}
              {/* <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  name="area"
                  placeholder= "Tiêu đề"
                  onBlur={handleBlur}
                  value={values.area}
                  onChange={(e) => {
                    setFieldValue('area', e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Tìm kiếm theo diện tích</b>
                </small>
              </div> */}
             
            </div>
          </form>
        )}
      </Formik>
      <div className="roomlist-container">
      {
                    roomFilter && roomFilter.map(room => {
                      var {_id, address, area, numberOfRoom, price, title,img } = room;
                      return (                        
                        <RoomItem  
                        title={title}
                        location={address}
                        price={price}
                        area={area}
                        number_of_room={numberOfRoom}
                        img = {img}
                        onClick = {() => remoteToDetail(_id)}
                        />
                      )
                    }
                    )
                }
      </div>
              

             

    </>
  );
}

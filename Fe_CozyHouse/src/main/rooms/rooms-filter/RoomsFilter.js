import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { isEqual } from 'lodash';
import { useRoomsUIContext } from '../RoomsUIContext';
// import i18n from 'i18next';

const prepareFilter = (queryParams, values) => {
  const { room } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  // Filter by name
  filter.model = room;
  // Filter by Name
  if (room) {
    filter.name = room;
  } 
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function RoomsFilter() {
  // Rooms UI Context
  const roomsUIContext = useRoomsUIContext();
  const roomsUIProps = useMemo(() => {
    return {
      queryParams: roomsUIContext.queryParams,
      setQueryParams: roomsUIContext.setQueryParams,
    };
  }, [roomsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(roomsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, roomsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;

      // update list by queryParams
      roomsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          room: ''
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}>
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="room"
                  placeholder= "Tìm kiếm theo tên người đăng"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue('room', e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>{'IPay::SearchByName'}</b>
                </small>
              </div>
             
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

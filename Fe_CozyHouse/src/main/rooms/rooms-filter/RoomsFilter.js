import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { isEqual } from 'lodash';
import { useRoomsUIContext } from '../RoomsUIContext';
// import i18n from 'i18next';

const prepareFilter = (queryParams, values) => {
  const { title } = values;
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
          title: ''
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
             
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

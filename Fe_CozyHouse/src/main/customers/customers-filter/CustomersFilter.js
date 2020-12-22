import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { isEqual } from 'lodash';
import { useCustomersUIContext } from '../CustomersUIContext';
// import i18n from 'i18next';

const prepareFilter = (queryParams, values) => {
  const { searchText, email } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  // Filter by name
  filter.model = searchText;
  // Filter by Name
  if (searchText) {
    filter.name = searchText;
  }
  // Filter by email
  if (email) {
    filter.email = email;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function CustomersFilter() {
  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
    };
  }, [customersUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(customersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, customersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;

      // update list by queryParams
      customersUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          searchText: '',
          email: '',
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
            <div className="form-group row m-5">
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Tên"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue('searchText', e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Tìm kiếm theo tên</b>
                </small>
              </div>

              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={(e) => {
                    setFieldValue('email', e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Tìm kiếm theo email</b>
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

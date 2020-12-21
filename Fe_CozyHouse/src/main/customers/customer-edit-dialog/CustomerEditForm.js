// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
// import * as actionsBank from '../../../../redux/banks/banksActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Input,
  DatePickerField,
  SelectSearch,
  Select,
} from '../../../components/forms';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { CustomerType, Gender, CustomerStatus } from '../CustomersUIHelpers';
// import { usePermission } from '../../../../hooks/UsePermission';


export function CustomerEditForm({
  saveCustomer,
  customer,
  actionsLoading,
  onHide,
  editCustomerButtonClick,
  approveCustomerButtonClick,
  rejectCustomerButtonClick,
  disabled,
}) {

  // const hasEditPermission = usePermission('IPay.Customers.Edit');

  // Validation schema
  const CustomerEditSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Tối thiểu 3 ký tự")
      .max(50, "Tối đa 50 ký tự"),
    email: Yup.string(),
    phone: Yup.string(),
    socialIdOrBusinessLicense: Yup.string(),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={customer}
        validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          saveCustomer(values);
        }}>
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                {/* doanh nghiep va khach hang */}
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="position"
                    name="position"
                    value={
                      disabled ? customer.customerType : values.customerType
                    }
                    onChange={(event) => {
                      if (!disabled) {
                        setFieldValue(
                          'customerType',
                          Number(event.target.value),
                        );
                      }
                    }}
                    row>
                    <FormControlLabel
                      value={CustomerType.Enterprise}
                      control={<Radio />}
                      label= "Chủ trọ"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={CustomerType.Personal}
                      control={<Radio />}
                      label= "Người thuê"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
                {/* chủ trọ và người thuê */}
                <div className="form-group row">
                  {/* Name */}
                  {values.customerType === CustomerType.Personal ? (
                    <div className="col-lg-6">
                      <Field
                        name="name"
                        component={Input}
                        placeholder= "Tên chủ trọ"
                        label={
                          <>
                            Tên chủ trọ
                            <span className="text-danger"> * </span>
                          </>
                        }
                        withFeedbackLabel={true}
                        disabled={disabled}
                      />
                      {disabled &&
                        customer.customerHistory &&
                        customer.customerHistory.name !== customer.name && (
                          <p className="text-warning m-2 text-smail">
                            <span className="mr-3">
                              Dữ liệu cũ
                            </span>
                            {customer.customerHistory.name}
                          </p>
                        )}
                    </div>
                  ) : (
                    <div className="col-lg-6">
                      <Field
                        name="name"
                        component={Input}
                        placeholder="Tên người thuê"
                        label={
                          <>
                            Tên người thuê
                            <span className="text-danger"> * </span>
                          </>
                        }
                        withFeedbackLabel={true}
                        disabled={disabled}
                      />
                      {disabled &&
                        customer.customerHistory &&
                        customer.customerHistory.name !== customer.name && (
                          <p className="text-warning m-2 text-smail">
                            <span className="mr-3">
                              Dữ liệu cũ:
                            </span>
                            {customer.customerHistory.name}
                          </p>
                        )}
                    </div>
                  )}
                  {/* Email */}
                  <div className="col-lg-6">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label={
                        <>
                          Email
                          <span className="text-danger"> * </span>
                        </>
                      }
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                    {disabled &&
                      customer.customerHistory &&
                      customer.customerHistory.email !== customer.email && (
                        <p className="text-warning m-2 text-smail">
                          <span className="mr-3">
                            Dữ liệu cũ:
                          </span>
                          {customer.customerHistory.email}
                        </p>
                      )}
                  </div>
                </div>

                {/* Phone */}
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="phone"
                      component={Input}
                      placeholder="Số điện thoại"
                      label={
                        <>
                          Số điện thoại
                          <span className="text-danger"> * </span>
                        </>
                      }
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                    {disabled &&
                      customer.customerHistory &&
                      customer.customerHistory.phone !== customer.phone && (
                        <p className="text-warning m-2 text-smail">
                          <span className="mr-3">
                            Dữ liệu cũ:
                          </span>
                          {customer.customerHistory.phone}
                        </p>
                      )}
                  </div>
                  {/* Address */}
                  <div className="col-lg-6">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Địa chỉ"
                      label="Địa chỉ"
                      disabled={disabled}
                    />
                    {disabled &&
                      customer.customerHistory &&
                      customer.customerHistory.address !== customer.address && (
                        <p className="text-warning m-2 text-smail">
                          <span className="mr-3">
                            Dữ liệu cũ:
                          </span>
                          {customer.customerHistory.address}
                        </p>
                      )}
                  </div>
                </div>

                {values.customerType === CustomerType.Personal ? (
                  <>
                    <div className="form-group row">
                      {/* IP Gender */}

                      <div className="col-lg-4">
                        {disabled ? (
                          <>
                            <Field
                              name="gender"
                              component={Input}
                              value={Gender[customer.gender]}
                              label="Giới tính"
                              disabled={disabled}
                            />
                            {customer.customerHistory &&
                              customer.customerHistory.gender !==
                                customer.gender && (
                                <p className="text-warning m-2 text-smail">
                                  <span className="mr-3">
                                    Dữ liệu cũ:
                                  </span>
                                  {customer.customerHistory.gender}
                                </p>
                              )}
                          </>
                        ) : (
                          <Select name="gender" label="Giới tính">
                            <option value="0">
                              Nam
                            </option>
                            <option value="1">
                              Nữ
                            </option>
                          </Select>
                        )}
                      </div>
                      {/* Date of birth */}

                      <div className="col-lg-4">
                        {disabled ? (
                          <>
                            <Field
                              value={customer.birthDate}
                              component={Input}
                              label="Ngày sinh"
                              disabled={disabled}
                            />
                            {customer.customerHistory &&
                              customer.customerHistory.birthDate !==
                                customer.birthDate && (
                                <p className="text-warning m-2 text-smail">
                                  <span className="mr-3">
                                    Dữ liệu cũ:
                                  </span>
                                  {customer.customerHistory.birthDate}
                                </p>
                              )}
                          </>
                        ) : (
                          <DatePickerField
                            name="birthDate"
                            placeholderText="Ngày sinh"
                            label="Ngày sinh"
                          />
                        )}
                      </div>
                      {/* SocialId */}
                      <div className="col-lg-4">
                        <Field
                          name="CMND"
                          component={Input}
                          placeholder="CMND"
                          label={
                            <>
                              Chứng minh nhân dân
                              <span className="text-danger"> * </span>
                            </>
                          }
                          disabled={disabled}
                        />
                        {disabled &&
                          customer.customerHistory &&
                          customer.customerHistory.CMND !==
                            customer.CMND && (
                            <p className="text-warning m-2 text-smail">
                              <span className="mr-3">
                                Dữ liệu cũ:
                              </span>
                              {
                                customer.customerHistory
                                  .CMND
                              }
                            </p>
                          )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                   
                  </>
                )}

               
              </Form>
            </Modal.Body>
            {customer.reasonReject && (
              <div className="m-3">
                "Lý do từ chối duyệt"
                <div className="text-danger my-2 border rounded p-3">
                  {customer.reasonReject}
                </div>
              </div>
            )}
            <Modal.Footer>
              {disabled ? (
                <>
                  {customer.customerStatus === CustomerStatus.NotApprove && (
                    <>
                      <button
                        className="btn btn-light btn-hover-success"
                        onClick={() => approveCustomerButtonClick()}>
                        <i className="far fa-check-circle text-success text-hover-white"></i>{' '}
                        Duyệt khách hàng
                      </button>
                      <button
                        className="btn btn-light btn-hover-danger btn-elevate"
                        onClick={() => rejectCustomerButtonClick()}>
                        <i className="far fa-times-circle text-danger text-hover-white"></i>{' '}
                        Từ chối khách hàng
                      </button>
                    </>
                  )}
                  {/* {hasEditPermission && ( */}
                    <button
                      type="button"
                      onClick={() => editCustomerButtonClick(customer._id)}
                      className="btn btn-primary btn-elevate">
                      Sửa thông tin
                    </button>
                  {/* )} */}
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate">
                    Hủy
                  </button>
                  <> </>
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className="btn btn-primary btn-elevate">
                    Lưu
                  </button>
                </>
              )}
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

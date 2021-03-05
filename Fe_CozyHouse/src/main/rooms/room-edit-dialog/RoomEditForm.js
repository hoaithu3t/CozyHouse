// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useContext, useState } from "react";
import { Modal } from "react-bootstrap";
// import * as actionsBank from '../../../../redux/banks/banksActions';
// import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from "formik";
import { useAsync } from "react-hook-async";
import { toast } from "react-toastify";

import * as Yup from "yup";
import {
  Input,
  // DatePickerField,
  // SelectSearch,
  Select,
} from "../../../components/forms";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import {
  kitchenType,
  RoomStatus,
  timeRemainType,
  TypeOfRoom,
} from "../RoomsUIHelpers";
// import { usePermission } from '../../../../hooks/UsePermission';
import { uploadFile } from "../../../api/file";
import authCtx from "../../../contexts/auth";

export function RoomEditForm({
  saveRoom,
  room,
  actionsLoading,
  onHide,
  editRoomButtonClick,
  approveRoomButtonClick,
  rejectRoomButtonClick,
  disabled,
}) {
  const { authUser } = useContext(authCtx);
  const [linksImg, setLinksImg] = useState([]);

  useEffect(() => {
    if (room) {
      if (room.img) setLinksImg(room.img);
    }
    // server call for getting Room by id
  }, [room]);

  // const hasEditPermission = usePermission('IPay.Rooms.Edit');

  // Validation schema
  const RoomEditSchema = Yup.object().shape({
    title: Yup.string().required("Chưa nhập tiêu đề"),
    address: Yup.string().required("Chưa nhập địa chỉ"),
    typeOfRoom: Yup.number().required("Chưa chọn kiểu phòng"),
    numberOfRoom: Yup.number("Chỉ nhập kiểu số").required("Chưa nhập số phòng"),
    price: Yup.string().required("Chưa nhập số phòng"),
    rentalTime: Yup.string().required("Chưa nhập thời gian thuê phòng"),
    area: Yup.number("Chỉ nhập kiểu số"),
    inputTimeRemain: Yup.number("Chỉ nhập kiểu số"),
  });

  const [uploadFileApi, callUploadFileApi] = useAsync(null, uploadFile);

  let fileInput;
  const onChooseImage = (event, setFieldValue) => {
    if (event.target.files.length < 3) {
      toast.error("Thêm tối thiểu 3 ảnh");
      return;
    }
    let files = event.target.files;
    setLinksImg(Array(files.length));
    for (var i = 0; i < files.length; i++) {
      // eslint-disable-next-line no-loop-func
      callUploadFileApi(event.target.files[i], authUser.token).then((res) => {
        var newLinksImg = linksImg;
        newLinksImg.push(res.data);
        setLinksImg(newLinksImg);
        return setFieldValue(`photoUrl${i}`, res.data);
      });
    }
  };

  const getRentCost = (number, time) => {
    let cost;
    if (time === "0") {
      cost = number * 2000;
    } else if (time === "1") {
      cost = number * 30000;
    } else cost = number * 100000;
    return (
      <>
        <div>Giá tiền</div>
        <br />
        <div>{cost}</div>
      </>
    );
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={room}
        validationSchema={RoomEditSchema}
        onSubmit={(values) => {
          values.photoUrl = linksImg;
          if (linksImg.length < 1) toast.error("Chưa chọn ảnh cho phòng");
          saveRoom(values);
        }}
      >
        {({ handleSubmit, values, setFieldValue, errors }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                {/* Title */}
                <div>
                  <div>
                    <Field
                      type="text"
                      name="title"
                      component={Input}
                      placeholder="Tiêu đề"
                      label={
                        <>
                          Tiêu đề
                          <span className="text-danger"> * </span>
                        </>
                      }
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                  </div>
                </div>
                {/* Mô tả */}
                <div>
                  <div>
                    <Field
                      type="text"
                      name="description"
                      component={Input}
                      placeholder="Mô tả"
                      label="Mô tả"
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                  </div>
                </div>

                {/* Địa chỉ */}
                <div>
                  <div>
                    <Field
                      name="address"
                      component={Input}
                      placeholder="số nhà - đường (thôn) - phường(thị xã) - quận (huyện)- tỉnh (thành phố)"
                      label={
                        <>
                          Địa chỉ
                          <span className="text-danger"> * </span>
                        </>
                      }
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                  </div>
                </div>

                {/* Địa điểm công cộng gần đó */}
                <div>
                  <div>
                    <Field
                      name="nearbyPlace"
                      component={Input}
                      placeholder="Lăng bác, Bệnh viện 109"
                      label={
                        <>
                          Địa điểm công cộng xung quanh:
                          <span className="text-danger"> * </span>
                        </>
                      }
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                  </div>
                </div>

                {/* Loại phòng + Số lượng phòng */}
                <div className="form-group row">
                  {/* loại phòng */}
                  <div className="col-lg-6">
                    {disabled ? (
                      <Field
                        name="typeOfRoom"
                        component={Input}
                        value={TypeOfRoom[room.type]}
                        label="Loại phòng"
                        disabled={disabled}
                      />
                    ) : (
                      <Select name="typeOfRoom" label="Loại phòng">
                        <option value="0">phòng trọ</option>
                        <option value="1">chung cư mimi</option>
                        <option value="2">nhà nguyên căn</option>
                        <option value="3">chung cư nguyên căn</option>
                      </Select>
                    )}
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="numberOfRoom"
                      component={Input}
                      placeholder=""
                      label={
                        <>
                          Số lượng phòng
                          <span className="text-danger"> * </span>
                        </>
                      }
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                  </div>
                </div>

                {/* Giá cả + Diện tích */}
                <div className="form-group row">
                  {/* Giá phòng */}
                  <div className="col-lg-4">
                    <Field
                      name="price"
                      component={Input}
                      placeholder=""
                      label={
                        <>
                          Giá phòng
                          <span className="text-danger"> * </span>
                        </>
                      }
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                  </div>
                  <> / </>
                  {/* Tính theo */}
                  <div className="col-lg-3">
                    <Field
                      name="rentalTime"
                      component={Input}
                      placeholder="1 tháng"
                      label={
                        <>
                          Thời gian thuê
                          <span className="text-danger"> * </span>
                        </>
                      }
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="area"
                      component={Input}
                      placeholder="Diện tích (m²)"
                      label={
                        <>
                          Diện tích (m²)
                          <span className="text-danger"> * </span>
                        </>
                      }
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                  </div>
                </div>

                {/* cơ sở vật chất */}
                <div>Phòng tắm</div>
                <div className="form-group row ml-2">
                  {/* phòng tắm */}

                  <div className="col-lg-6">
                    <Field
                      type="checkbox"
                      name="bathroom"
                      className="mr-2"
                      disabled={disabled}
                    />
                    <span>Khép kín</span>
                  </div>

                  <div className="col-lg-6">
                    <Field
                      type="checkbox"
                      name="electricWaterHeater"
                      className="mr-2"
                      disabled={disabled}
                    />
                    <span>Có nóng lạnh</span>
                  </div>
                </div>

                <div>Phòng bếp</div>
                <FormControl component="fieldset" className="ml-2">
                  <RadioGroup
                    aria-label="position"
                    name="kitchen"
                    value={disabled ? room.kitchen : values.kitchen}
                    onChange={(event) => {
                      if (!disabled) {
                        setFieldValue("kitchen", Number(event.target.value));
                      }
                    }}
                    row
                  >
                    <FormControlLabel
                      value={kitchenType.privateKitchen}
                      control={<Radio />}
                      label="Khu bếp riêng"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={kitchenType.sharedKitchen}
                      control={<Radio />}
                      label="Khu bếp chung"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={kitchenType.notCooking}
                      control={<Radio />}
                      label="Không nấu ăn"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>

                <div>Phòng: </div>
                <div className="form-group row ml-2">
                  {/* Điều hòa */}
                  <div className="col-lg-6">
                    <Field
                      type="checkbox"
                      name="conditioner"
                      className="mr-2"
                      disabled={disabled}
                    />
                    <span>Có điều hòa</span>
                  </div>
                  <div className="col-lg-6">
                    <Field
                      type="checkbox"
                      name="balcony"
                      className="mr-2"
                      disabled={disabled}
                    />
                    <span>Có ban công</span>
                  </div>
                </div>

                <div className="form-group row">
                  {/* Điện nước */}
                  <div className="ml-4">Điện nước:</div>
                  <div className="col-lg-6">
                    <Field
                      type="checkbox"
                      name="electricWaterPrice"
                      className="mr-2"
                      disabled={disabled}
                    />
                    <span>Giá dân</span>
                  </div>
                </div>
                {/* Tiện ích khác */}
                <div className="">
                  <div>
                    <Field
                      name="otherUtility"
                      component={Input}
                      placeholder="Có tủ lạnh, có giường sẵn,..."
                      label="Tiện ích khác"
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                  </div>
                </div>

                {/* Thời gian hiển thị */}
                <div className="form-group row">
                  <div className="col-lg-3">
                    <Field
                      name="inputTimeRemain"
                      component={Input}
                      label="Thời gian hiển thị"
                      withFeedbackLabel={true}
                      disabled={disabled}
                    />
                  </div>
                  <div className="col-lg-3">
                    {disabled ? (
                      <Field
                        name="timeRemain"
                        component={Input}
                        value={room.timeRemain}
                        label="Thời gian hiển thị bài đăng"
                        disabled={disabled}
                      />
                    ) : (
                      <Select name="timeRemain" label="Thời gian">
                        <option value={timeRemainType.Week}>tuần</option>
                        <option value={timeRemainType.Month}>tháng</option>
                        <option value={timeRemainType.Year}>năm</option>
                      </Select>
                    )}
                  </div>
                  <div className="col-lg-6">
                    {values.inputTimeRemain && values.timeRemain
                      ? getRentCost(values.inputTimeRemain, values.timeRemain)
                      : ""}
                  </div>
                </div>
                {/* Photo */}
                <div className="form-group row ml-2">
                  <h4 className="code">Photo</h4>
                  {linksImg.map((el, i) => (
                    <div>
                      {/* eslint-disable-next-line jsx-a11y/alt-text */}
                      <img
                        src={process.env.REACT_APP_API_DOMAIN + "/" + el}
                        style={{ width: "80px", height: "80px" }}
                        className="border m-3"
                      />
                    </div>
                  ))}
                  <div className="align-items-center">
                    {uploadFileApi.loading ? (
                      "Loading ..."
                    ) : (
                      <span
                        src={
                          process.env.REACT_APP_API_DOMAIN +
                          "/" +
                          values.photoUrl
                        }
                        alt=""
                        onClick={() => fileInput.click()}
                        style={{ width: "80px", height: "80px" }}
                        className="border m-3 material-icons md-48"
                      >
                        add_photo_alternate
                      </span>
                    )}
                    <br />
                    <input
                      className="ml-3 bg-red form-control"
                      type="file"
                      hidden
                      multiple
                      // name = "photoUrl"
                      ref={(file) => (fileInput = file)}
                      accept="image/png, image/jpeg"
                      onChange={(event) => onChooseImage(event, setFieldValue)}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>

            {room.reasonReject && (
              <div className="m-3">
                "Lý do từ chối duyệt"
                <div className="text-danger my-2 border rounded p-3">
                  {room.reasonReject}
                </div>
              </div>
            )}
            <Modal.Footer>
              {disabled ? (
                <>
                  {room.roomStatus === RoomStatus.NotApprove && (
                    <>
                      <button
                        className="btn btn-light btn-hover-success"
                        onClick={() => approveRoomButtonClick()}
                      >
                        <i className="far fa-check-circle text-success text-hover-white"></i>{" "}
                        Duyệt phòng
                      </button>
                      <button
                        className="btn btn-light btn-hover-danger btn-elevate"
                        onClick={() => rejectRoomButtonClick()}
                      >
                        <i className="far fa-times-circle text-danger text-hover-white"></i>{" "}
                        Từ chối duyệt phòng
                      </button>
                    </>
                  )}
                  {/* {hasEditPermission && ( */}
                  <button
                    type="button"
                    onClick={() => editRoomButtonClick(room._id)}
                    className="btn btn-primary btn-elevate"
                  >
                    Sửa thông tin
                  </button>
                  {/* )} */}
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                  >
                    Hủy
                  </button>
                  <> </>
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className="btn btn-primary btn-elevate"
                  >
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

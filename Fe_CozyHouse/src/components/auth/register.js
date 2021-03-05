import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../api/auth";
import { useAsync } from "react-hook-async";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CustomerType } from "../../main/customers/CustomersUIHelpers";

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Username must length than 6 characters!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(4, "Password must length than 4 characters!")
    .max(50, "Too Long!")
    .required("Required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confirm password not matched!")
    .required("Required"),
});

const Register = (props) => {
  const [registerApiData, fetchRegister] = useAsync(null, register);

  // const [successModalVisible, setSuccessModalVisible] = useState(false);
  // const [failureModalVisible, setFailureModalVisible] = useState(false);

  const formik = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      CMND: "",
      address: "",
      phone: "",
      email: "",
      birthDate: null,
      gender: null,
      role: "0",
    },
    onSubmit: (values) => {
      fetchRegister(
        values.username,
        values.password,
        values.confirmPassword,
        values.CMND,
        values.address,
        values.phone,
        values.email,
        values.birthDate,
        values.gender,
        values.role
      )
        .then(() => {
          // setSuccessModalVisible(true);
        })
        .catch(() => {
          // setFailureModalVisible(true);
        });
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Đăng ký</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="m-4 text-center" onSubmit={formik.handleSubmit}>
          {/* họ tên */}
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="position"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              row
            >
              <FormControlLabel
                value={CustomerType.Renter.toString()}
                control={<Radio />}
                label="Người thuê"
                labelPlacement="end"
              />
              <FormControlLabel
                value={CustomerType.Owner.toString()}
                control={<Radio />}
                label="Chủ trọ"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
          <Form.Group controlId="formBasicUsername" className="text-left">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              name="username"
              value={formik.values.username}
              isInvalid={formik.errors.username}
              placeholder="Enter userName"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          {/* số điện thoại */}
          <Form.Group controlId="formPhone" className="text-left">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              name="phone"
              value={formik.values.phone}
              isInvalid={formik.errors.phone}
              placeholder="Nhập số điện thoại"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          {/* email */}
          <Form.Group controlId="formEmail" className="text-left">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={formik.handleChange}
              name="email"
              value={formik.values.email}
              isInvalid={formik.errors.email}
              placeholder="Nhập email"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          {/* eslint-disable-next-line eqeqeq */}
          {formik.values.role == 1 && (
            <>
              {/* CMND */}
              <Form.Group controlId="formCMND" className="text-left">
                <Form.Label>CHứng minh nhân dân</Form.Label>
                <Form.Control
                  type="text"
                  onChange={formik.handleChange}
                  name="CMND"
                  value={formik.values.CMND}
                  isInvalid={formik.errors.CMND}
                  placeholder="Nhập số CMND"
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.CMND}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Địa chỉ */}
              <Form.Group controlId="formAddress" className="text-left">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  onChange={formik.handleChange}
                  name="address"
                  value={formik.values.address}
                  isInvalid={formik.errors.address}
                  placeholder="Nhập địa chỉ"
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.address}
                </Form.Control.Feedback>
              </Form.Group>
              {/* birthDate */}
              <Form.Group controlId="formBirthDate" className="text-left">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  type="Date"
                  onChange={formik.handleChange}
                  name="birthDate"
                  value={formik.values.birthDate}
                  isInvalid={formik.errors.birthDate}
                  placeholder="Nhập ngày sinh"
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.birthDate}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          {/* gender */}
          <Form.Group controlId="formGender" className="text-left">
            <Form.Label>Giới tính</Form.Label>
            <Form.Control
              as="select"
              className="mr-sm-2"
              id="inlineFormCustomSelect"
              custom
              onChange={formik.handleChange}
              name="gender"
              value={formik.values.gender}
              isInvalid={formik.errors.gender}
            >
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.gender}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Mật khẩu */}
          <Form.Group controlId="formBasicPassword" className="text-left">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              onChange={formik.handleChange}
              name="password"
              isInvalid={formik.errors.password}
              value={formik.values.password}
              placeholder="Password"
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            controlId="formBasicConfirmPassword"
            className="text-left"
          >
            <Form.Label>Nhập lại mật khẩu</Form.Label>
            <Form.Control
              type="password"
              onChange={formik.handleChange}
              name="confirmPassword"
              isInvalid={formik.errors.confirmPassword}
              value={formik.values.confirmPassword}
              placeholder="Nhập lại mật khẩu"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <div>
            <Button
              className="m-color border-none"
              type="submit"
              style={{ width: "60%" }}
              disabled={registerApiData.loading}
            >
              {registerApiData.loading ? "Đang đăng ký" : "Đăng ký"}
            </Button>
          </div>
          <Form.Label>
            Bạn đã có tài khoản? &nbsp;
            <span className="link" onClick={props.onMoveToLogin}>
              đăng nhập
            </span>
            &nbsp; ngay!
          </Form.Label>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={props.onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Register;

import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../api/auth";
import { useAsync } from "react-hook-async";

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
  policy: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});

const Register = (props) => {
  const [registerApiData, fetchRegister] = useAsync(null, register);

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);

  const formik = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      bio: "",
      education: "",
      policy: false,
    },
    onSubmit: (values) => {
      fetchRegister(
        values.username,
        values.password,
        values.bio,
        values.education
      )
        .then(() => {
          setSuccessModalVisible(true);
        })
        .catch(() => {
          setFailureModalVisible(true);
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
          <Modal.Title id="contained-modal-title-vcenter">
            Đăng ký
          </Modal.Title>
          </Modal.Header>
    <Modal.Body>
        <Form className="m-4 text-center" onSubmit={formik.handleSubmit}>
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

          <Form.Group controlId="formBasicPassword" className="text-left">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              name="phone"
              isInvalid={formik.errors.phone}
              value={formik.values.phone}
              placeholder="Số điện thoại"
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.bio}
            </Form.Control.Feedback>
          </Form.Group>

         
          <Button
            className="m-color border-none"
            type="submit"
            style={{ width: "60%" }}
            disabled={registerApiData.loading}
          >
            {registerApiData.loading ? "Registering" : "Register"}
          </Button>
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

import React, { useState, useContext } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useAsync } from "react-hook-async";

import { login } from "../../api/auth";
import { useHistory } from "react-router-dom";
import authCtx from "../../contexts/auth";

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Username must length than 6 characters!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(4, "Password must length than 4 characters!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = (props) => {
  const history = useHistory();
  const { setAuthUser } = useContext(authCtx);

  const [loginApiData, fetchLogin] = useAsync(null, login);

  const [failureModalVisible, setFailureModalVisible] = useState(false);

  const moveToDashBoard = () => {
    history.push("/");
  };

  const formik = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      username: "",
      password: "",
      rememberMe: true,
    },
    onSubmit: (values) => {
      fetchLogin(values.username, values.password, values.rememberMe)
        .then((authUser) => {
          localStorage.setItem("session", authUser.session);
          if (values.rememberMe) {
            localStorage.setItem("jwt", authUser.token);
          }
          setAuthUser(authUser);
          moveToDashBoard();
          props.onHide();
        })
        .catch((e) => {
          console.log(e);
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
            Đăng nhập
          </Modal.Title>
          </Modal.Header>
    <Modal.Body>
    <Form className="m-4 text-center" onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicUsername" className="text-left">
            <Form.Label>Tên đăng nhập</Form.Label>
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
          
          <div>
          <Button
            className="m-color border-none"
            type="submit"
            style={{ width: "60%" }}
            disabled={loginApiData.loading}
          >
            {loginApiData.loading ? "Đang đăng nhập" : "Đăng nhập"}
            </Button>
            </div>

          <Form.Label>
            Bạn chưa có tài khoản? &nbsp;
            <span className="link" onClick={props.onMoveToRegister}>
              Đăng ký
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
     
    //   </div>
    // </div>
  );
};

export default Login;

/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
import React, { useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useFormik } from "formik";
import { useAsync } from "react-hook-async";

import Avatar from "../avatar";

import authCtx from "../../contexts/auth";
import { Footer } from "../layout";

import { uploadFile } from "../../api/file";
import { updateMe } from "../../api/profile";
import withAuth from "../../hoc/authHoc";

const Profile = () => {
  let fileInput;
  const { authUser, setAuthUser } = useContext(authCtx);
  const [uploadFileApi, callUploadFileApi] = useAsync(null, uploadFile);
  const [updateMeApi, callUpdateMeApi] = useAsync(null, updateMe);
  const user = authUser.user;
  const formik = useFormik({
    initialValues: {
      bio: user.bio,
      photoUrl: user.photoUrl,
      education: user.education,
    },
    onSubmit: (values) => {
      callUpdateMeApi(authUser.token, values).then((updatedUser) =>
        setAuthUser({ ...authUser, user: updatedUser })
      );
    },
  });

  const onChooseImage = (event) => {
    if (event.target.files.length < 1) return;
    callUploadFileApi(event.target.files[0], authUser.token).then((res) =>
      formik.setFieldValue("photoUrl", res.data)
    );
  };

  return (
    <>
      <Container className="my-5">
        <h3 className="display-4">
          Profile: <span className="code">{authUser.user.username}</span>
        </h3>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="code">Photo</Form.Label>
            <div className="align-items-center">
              {uploadFileApi.loading ? (
                "Loading ..."
              ) : (
                <img
                  src={
                    process.env.REACT_APP_API_DOMAIN +
                    "/" +
                    formik.values.photoUrl
                  }
                  alt=""
                  onClick={() => fileInput.click()}
                  style={{ width: "80px", height: "80px" }}
                  className="border rounded-circle m-3"
                />
              )}
              <br />
              <Form.Control
                className="ml-3 bg-red"
                type="file"
                hidden
                ref={(file) => (fileInput = file)}
                accept="image/png, image/jpeg"
                onChange={onChooseImage}
              />
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label className="code">Bio</Form.Label>
            <Form.Control
              type="text"
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="code">Education</Form.Label>
            <Form.Control
              type="text"
              name="education"
              value={formik.values.education}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Button className="code color-pink" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default withAuth(Profile);

import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Route } from "react-router-dom";
import Profile from "./profile";
import authCtx from "../../contexts/auth";
import withAuth from "../../hoc/authHoc";

import { Footer} from "../layout";

const Setting = () => {
  const { authUser } = useContext(authCtx);

  return (
    <>
    <Container className="my-5">
      <h3 className="display-4">
        Settings for <span className="code">@{authUser.user.username}</span>
      </h3>

      <Row className="m-5 ">
        <Col xs={3} className="text-center">
          <i class="material-icons large_icon p-3">settings_brightness</i>
          <p>Night Mode</p>
        </Col>
        <Col xs={9} className="text">
          <div className="card_setting">
            <h4 className="p-3">Night Mode</h4>
            <Button variant="light" className="m-3">
              &nbsp;&nbsp;&nbsp;&nbsp;Off&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="m-5 ">
        <Col xs={3} className="text-center">
          <i class="material-icons large_icon p-3">settings_brightness</i>
          <p>Night Mode</p>
        </Col>
        <Col xs={9} className="text">
          <div className="card_setting">
            <h4 className="p-3">Night Mode</h4>
            <Button variant="light" className="m-3">
              &nbsp;&nbsp;&nbsp;&nbsp;Off&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="m-5 ">
        <Col xs={3} className="text-center">
          <i class="material-icons large_icon p-3">settings_brightness</i>
          <p>Night Mode</p>
        </Col>
        <Col xs={9} className="text">
          <div className="card_setting">
            <h4 className="p-3">Night Mode</h4>
            <Button variant="light" className="m-3">
              &nbsp;&nbsp;&nbsp;&nbsp;Off&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="m-5 ">
        <Col xs={3} className="text-center">
          <i class="material-icons large_icon p-3">settings_brightness</i>
          <p>Night Mode</p>
        </Col>
        <Col xs={9} className="text">
          <div className="card_setting">
            <h4 className="p-3">Night Mode</h4>
            <Button variant="light" className="m-3">
              &nbsp;&nbsp;&nbsp;&nbsp;Off&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="m-5 ">
        <Col xs={3} className="text-center">
          <i class="material-icons large_icon p-3">settings_brightness</i>
          <p>Night Mode</p>
        </Col>
        <Col xs={9} className="text">
          <div className="card_setting">
            <h4 className="p-3">Night Mode</h4>
            <Button variant="light" className="m-3">
              &nbsp;&nbsp;&nbsp;&nbsp;Off&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
    <Footer />
    </>
  );
};

export default withAuth(Setting);

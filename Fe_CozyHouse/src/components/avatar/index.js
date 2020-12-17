import React, { useContext, useState, useRef } from "react";
import { Popover, PopoverHeader, PopoverBody, Button } from "reactstrap";
// import { Link } from "react-router-dom";
import Setting from "../setting/index";
import defaultUser from "./avatar.jpg";
import authCtx from "../../contexts/auth";
import "../../css/avatar.css";
import { Link } from "react-router-dom";
const defaultSize = 40;

const sizeScale = {
  xs: 0.5,
  sm: 0.75,
  md: 1,
  lg: 1.25,
  xl: 1.5,
};

const Avatar = ({ size, src }) => {
  const [show, setShow] = useState(false);
  const { authUser, setAuthUser } = useContext(authCtx);

  const onClickLogOut = () => {
    localStorage.setItem("jwt", null);
    setAuthUser(null);
    document.location = "/";
  };
  const onClosePop = () => {
    setShow(false);
  };
  const url = src ? `${process.env.REACT_APP_API_DOMAIN}/${src}` : defaultUser;
  return (
    <>
      <Popover
        placement="bottom"
        isOpen={show}
        target="Popover1"
        toggle={() => setShow(!setShow)}
      >
        <PopoverHeader>@{authUser.user.username}</PopoverHeader>
        <PopoverBody className="d-flex flex-column p-0 " onClick={onClosePop}>
          <Link to="/setting" className="p-2 io" block>
            <i class="material-icons icon">settings</i>
            Setting
          </Link>
          <Link to="/profile" className="p-2 io">
            <i class="material-icons icon">person</i> Profile
          </Link>
          <a
            href="https://www.facebook.com/groups/441154729911930/"
            className="p-2 io"
          >
            <i class="material-icons icon">live_help</i> Help Center
          </a>
          <Link to="/profile" className="p-2 io">
            <i class="material-icons icon">settings_brightness</i> Night Mode
          </Link>
          <Link className=" p-2 io" onClick={onClickLogOut}>
            <i class="material-icons icon">power_settings_new</i>
            Logout
          </Link>
        </PopoverBody>
      </Popover>
      <img
        id="Popover1"
        onClick={() => setShow(!show)}
        src={url}
        alt=""
        className="border rounded-circle spanLogin pointer"
        style={{
          width: defaultSize * sizeScale[size],
          height: defaultSize * sizeScale[size],
        }}
      />
    </>
  );
};

Avatar.defaultProps = {
  size: "md",
};

export default Avatar;

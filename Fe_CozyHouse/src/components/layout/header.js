import React, { useState, useContext, useEffect } from "react";
import { Navbar, Form, FormControl, Button, Modal, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Auth from "../auth";
import Avatar from "../avatar/index";
import logo from "./logo.png";
import iconHeart from "./heart_outline.png";
import iconMess from "./mess.png";
import notification from "./notification.png";
import authCtx from "../../contexts/auth";
import { loadData } from "../../api/search";
import { useAsync } from "react-hook-async";
import "../../css/header.css";
import Login from "../auth/login"
import Register from "../auth/register"

const style = {
  fontSize: "30px",
  color: "white",
};

export const AuthModal = (props) => {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >   
        <Modal.Body>
          <Auth onHide={props.onHide} haveAccount = {props.haveAccount}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const Header = () => {
  const [search, setSearch] = useState(false);
  const [modalShowLogin, setModalShowLogin] = useState(false);
  const [modalShowRegister, setModalShowRegister] = useState(false);
  const { authUser } = useContext(authCtx);
  const [value, setValue] = useState(null);
  const [searchApiData, fetchSearchSetCard] = useAsync(null, loadData);
  const history = useHistory();
  const moveToDashboard = () => {
    history.push("/dashboard");
  };
  // useEffect(() => {
  //   fetchSearchSetCard(value)
  //     .then((setCard) => {
  //       console.log(setCard);
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //     });
  // }, [value]);

  return (
    <>
      <Navbar sticky="top" className="header">
        <Navbar.Brand onClick={moveToDashboard}>
          <b className=" pointer">
            <img src={logo} alt="" className="logo"/>
          </b>
        </Navbar.Brand>
        
        <div >
          <div className = "pb-2 pt-0 disable-768px">
            <b className="m-4 pointer">
              <img src={iconHeart} />
            </b>
            <b className="m-4 pointer">
              <img src={iconMess} />
            </b>
            <b className="m-4 pointer">
              <img src={notification} />
            </b>
          </div>
        <div>
        <Form inline className = "formRegister">
          {(
            <FormControl
              type="text"
              placeholder="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="inp-search pointer"
            />
          )}        
        
          <Button className="bnt-search" onClick={() => setSearch(!search)}>
            <i
              className="material-icons"
              style={{ width: "31px", height: "25px" }}
            >
              search
            </i>
          </Button>       
        
        </Form>
        </div>
        </div>
       
        {!authUser ? (
          <div className = "spanRegister">
          <span
            onClick={() => {
              setModalShowLogin(true);
            }}
            className="login pointer"
          >
            Đăng nhập
          </span>
          <span
          onClick={() => {
            setModalShowRegister(true);
          }}
          className="register pointer"
        >
          Đăng ký
        </span>

        </div>
        ) : (
            <>
          <Avatar size="xl" src={authUser.user.photoUrl} />
              </>
        )}
        <Login 
            show = {modalShowLogin} 
            onMoveToRegister = {() => {
                setModalShowLogin(false)
                setModalShowRegister(true)             
              }
            } 
            onHide = {() => {setModalShowLogin(false)}}/>
        <Register
            show = {modalShowRegister}
            onMoveToLogin = {() => {
                setModalShowRegister(false)
                setModalShowLogin(true)
              }
            } 
            onHide = {() => {setModalShowRegister(false)}}/>

      </Navbar>
    </>
  );
};

export default Header;

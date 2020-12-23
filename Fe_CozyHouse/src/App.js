import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import ReactDOM from 'react-dom'

import { Header } from "./components/layout";
import { Footer } from "./components/layout";

import ReactLoading from "react-loading";
import AuthContext from "./contexts/auth";
import { useAsync } from "react-hook-async";
import { Dashboard } from "./components/dashboard";
import RoomList from "./components/room_list/RoomList";
import {RoomsList} from "./main/rooms/room-list/RoomsList"
import {RoomDetail} from '../src/main/rooms/room-detail/RoomDetail'


import PostDetail from "./components/post_detail/PostDetail";

import { me } from "./api/profile";
import Setting from "./components/setting";
import Profile from "./components/setting/profile";
import Auth from "./components/auth/index";
import Customer from "./main/customers/Customers"
import Rooms from "./main/rooms/Rooms"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [authUser, setAuthUser] = useState(null);

  const [profileApi, fetchProfile] = useAsync(null, me);
  useEffect(() => {
    if (!authUser) {
      const jwt = localStorage.getItem("jwt");
      const ss = localStorage.getItem("session");
      // debugger;
      if (jwt !== null && jwt) {
        console.log("here" + jwt + "1");
        fetchProfile(jwt).then((user) => setAuthUser(user));
      } else if (ss) {
        console.log("here" + ss);
        fetchProfile(ss).then((user) => setAuthUser(user));
      }
    }
  }, [authUser, fetchProfile, setAuthUser]);

  if (profileApi.loading) {
    return (
      <div className="loading">
        <ReactLoading type="spin" color="#ffa5ab" />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/setting" component={Setting} />
          <Route path="/auth" component={Auth} />
          <Route path="/profile" component={Profile} />
          <Route path ={"/:id/roomDetail"} component = {RoomDetail} />
          {/* <Route path="/room_list" component={RoomList} /> */}
          <Route path="/room_list" component={RoomsList} />
          <Route path="/post_detail" component={PostDetail} />
          <Route path="/customer" component={Customer} />
          <Route path="/rooms" component={Rooms} />
        </Switch>
        <Footer />
        <ToastContainer position="top-center" />
      </div>
    </AuthContext.Provider>
  );
}

export default App;

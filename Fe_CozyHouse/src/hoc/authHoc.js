import React, { useContext } from "react";
// import { useAsync } from "react-hook-async";
// import ReactLoading from "react-loading";
import authCtx from "../contexts/auth";
import Dashboard from "../components/dashboard/dashboard";

// import { me } from "../api/profile";

const withAuth = (WrappedComponent) => (props) => {
  // eslint-disable-next-line no-unused-vars
  const { authUser, setAuthUser } = useContext(authCtx);

  // const [profileApi, fetchProfile] = useAsync(null, me);

  // useEffect(() => {
  //   if (!authUser) {
  //     const jwt = localStorage.getItem("jwt");
  //     const ss = localStorage.getItem("session");
  //     if (jwt) {
  //       fetchProfile(jwt).then((user) => setAuthUser(user));
  //     } else if (ss) {
  //       fetchProfile(ss).then((user) => setAuthUser(user));
  //     }
  //   }
  // }, [authUser, fetchProfile, setAuthUser]);

  // if (profileApi.loading) {
  //   return (
  //     <div className="loading">
  //       <ReactLoading type="spin" color="#ffa5ab" />
  //     </div>
  //   );
  // }
  if (authUser !== null) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Dashboard {...props} />;
};

export default withAuth;

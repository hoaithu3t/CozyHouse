import React, { useState } from "react";
import Login from "./login";
import Register from "./register";


const Auth = (props) => {
  const [haveAccount, setHaveAccount] = useState(props.haveAccount);
  return (
    <div>
      {haveAccount ? (
        <Login
          onHide={props.onHide}
          onMoveToRegister={() => setHaveAccount(false)}
        />
      ) : (
        <Register           
          onMoveToLogin={() => setHaveAccount(true)}
         />
      )}
    </div>
  );
};

export default Auth;

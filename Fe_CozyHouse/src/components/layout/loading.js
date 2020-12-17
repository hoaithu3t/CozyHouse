import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ show }) => {
  return (
    <div>
      {show && (
        <div className="loading">
          <ReactLoading type="spin" color="#ffa5ab" />
        </div>
      )}
    </div>
  );
};

export default Loading;

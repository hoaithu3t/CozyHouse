import React, { useState, useContext } from "react";

import { useAsync } from "react-hook-async";

import { useHistory } from "react-router-dom";
import authCtx from "../../contexts/auth";

import { loadData } from "../../api/search";

const SearchSetCard = (props) => {
  const [searchApiData, fetchSearchSetCard] = useAsync(null, loadData);
  fetchSearchSetCard(props)
    .then((setCard) => {
      console.log(setCard);
    })
    .catch((e) => {
      console.log(e.message);
    });
};

export default SearchSetCard;

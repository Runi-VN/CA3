import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Swapi = ({ loggedIn }) => {
  return (
    <>
      {loggedIn ? <SwapiContent /> : <p>You are not logged in.</p>}

      <Link to="/">Back</Link>
    </>
  );
};

const SwapiContent = () => {
  // MAKE CALL HERE TO APIFACADE HERE AND SHOW IT
  return <div> Logged in and on Swapi </div>;
};

export default Swapi;

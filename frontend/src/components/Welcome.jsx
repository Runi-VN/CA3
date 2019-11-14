import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <h1>Welcome Page</h1>
      <p> INSERT INITIAL INSTRUCTIONS ON HOW TO USE THE QUICK-START PROJECT </p>
      <br></br>
      <br></br>
      <Link to="/login">Login Page</Link>
    </>
  );
};

export default Welcome;

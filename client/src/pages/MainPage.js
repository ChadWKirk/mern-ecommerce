import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const MainPage = ({ curUser }) => {
  return (
    <div>
      <h1>Main Page</h1>
      <NavBar curUser={curUser} />
    </div>
  );
};

export default MainPage;

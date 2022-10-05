import React from "react";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import DropDown from "../components/DropDown";

const CartPage = ({ curUser, loggedIn }) => {
  return (
    <div>
      <NavBar curUser={curUser} loggedIn={loggedIn} />
      <DropDown />
      <div className="cartContainer">
        <div>
          <h1>Cart Page</h1>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

import React from "react";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";

const AccountPage = ({ curUser, loggedIn }) => {
  const navigate = useNavigate();
  // const { username } = useParams();
  console.log(curUser + " this is username in url");
  async function delAcc(e) {
    e.preventDefault();

    if (
      window.confirm(
        `Are you sure you would like to permanantely delete your account "${curUser}"?`
      )
    ) {
      await fetch(`http://localhost:5000/Account/${curUser}/delUser`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      }).then(() =>
        setTimeout(() => {
          window.location.href = "/delSuccess";
        }, 500)
      );
    } else {
      console.log("nothing happened");
    }
  }

  return (
    <div>
      <div className="navContainer">
        <Logo />
        <SearchBar />
        <NavBar curUser={curUser} loggedIn={loggedIn} />
      </div>
      <h2>Shipping Address:</h2>
      <p>shipping address</p>
      <a href="">Edit</a>
      <h2>Credit Card Number:</h2>
      <p>cc number</p>
      <a href="">Edit</a>
      <h2>-----------------</h2>
      <a href="" onClick={delAcc}>
        <h3>Delete account</h3>
      </a>
    </div>
  );
};

export default AccountPage;

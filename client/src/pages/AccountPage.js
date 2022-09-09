import React from "react";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";

const AccountPage = ({ curUser }) => {
  const navigate = useNavigate();
  const { username } = useParams();
  async function delAcc(e) {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you would like to permanantely delete your account?"
      )
    ) {
      await fetch(`http://localhost:5000/Account/${username}/delUser`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      }).then(
        setTimeout(() => {
          navigate("/delSuccess");
        }, 300)
      );
    } else {
      console.log("nothing happened");
    }
  }

  return (
    <div>
      <h1>Account Page</h1>
      <NavBar curUser={curUser}/>
      <a href="">
        <h2>Sell Item</h2>
      </a>
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

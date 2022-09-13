import React from "react";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";

const AccountPage = ({ curUser, loggedIn, del, setDel }) => {
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
      }).then(
        () =>
          //set del to 1 for mainpage.js "account has been removed" banner
          setDel(1),
        //del not setting IS NOT a time issue
        setTimeout(() => {
          navigate("/");
        }, 500)
      );
    } else {
      console.log("nothing happened");
    }
  }

  return (
    <div>
      <h1>Account Page</h1>
      <NavBar curUser={curUser} loggedIn={loggedIn} />
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

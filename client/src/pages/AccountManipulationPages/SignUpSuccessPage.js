import React from "react";
import { useParams } from "react-router-dom";

const SignUpSuccessPage = () => {
  const { username } = useParams();

  return (
    <div>
      <h1>Congratulations! You've signed up!</h1>
      <a href={`/Account/${username}`}>
        <h3>Click here to access your account.</h3>
      </a>
    </div>
  );
};

export default SignUpSuccessPage;

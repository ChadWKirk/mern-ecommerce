const express = require("express");
const app = express();
require("dotenv").config({ path: "./config.env" });
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbo = require("./db/conn");
const { response } = require("express");

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  dbo.connectToServer((err) => {
    if (err) console.log(err);
  });
  console.log("server has connected.");
});

app.get("/users", (req, res) => {
  let db_connect = dbo.getDb();

  db_connect
    .collection("mern-ecommerce-users")
    .find()
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});
//sign in post
app.post("/users", (req, response) => {
  let db_connect = dbo.getDb();
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    signedIn: false,
  };

  db_connect
    .collection("mern-ecommerce-users")
    .find({ username: req.body.username }) //check if user already exists
    .toArray(function (err, result) {
      if (err) {
        response.status(400).send("error");
        console.log("to array error");
      } else if (result.length > 0) {
        console.log("Username already exists. Sign up failed.");
      } else {
        //if user is new
        db_connect
          .collection("mern-ecommerce-users")
          .insertOne(newUser, function (err, res) {
            if (err) throw err;
            response.json(res);
          });
      }
    });
});

app.post("/SignIn", (req, res) => {
  let db_connect = dbo.getDb();
  //check if user exists

  db_connect.collection("mern-ecommerce-users").findOne(
    {
      username: req.body.username,
      password: req.body.password,
      signedIn: false,
    },
    function (err, user) {
      if (err) {
        console.log(err);
      }
      if (user) {
        console.log("success");
        db_connect.collection("mern-ecommerce-users").updateOne(
          {
            username: req.body.username,
            password: req.body.password,
            signedIn: false,
          },
          {
            //change signedIn to true
            $set: {
              username: req.body.username,
              password: req.body.password,
              signedIn: true,
            },
          }
        );
      } else {
        console.log("no user exists.");
      }
    }
  );
});

app.post("/SignOut", (req, res) => {
  let db_connect = dbo.getDb();

  db_connect
    .collection("mern-ecommerce-users")
    .updateOne(
      { signedIn: true },
      { $set: { signedIn: false } },
      function (err, res) {
        if (err) throw err;
        console.log("signed out");
      }
    );
});

app.delete("/Account/:username/delUser", (req, res) => {
  let db_connect = dbo.getDb();
  db_connect
    .collection("mern-ecommerce-users")
    .deleteOne({ username: req.params.username });

  console.log("account deleted " + req.params.username); //req.params.username is whatever is in the URL at the position of :username
});

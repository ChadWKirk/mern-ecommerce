import React, { useState, useEffect, useRef } from "react";
import MainPageNavBar from "../components/MainPageNavBar";
import Carousel2 from "../components/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const MainPage = ({ curUser, loggedIn }) => {
  //on load, fetch random images and use them as variables in the img src
  //resJSON will be an array of secure_url's
  const [randomGallery, setRandomGallery] = useState([]);

  var slideArr = [];

  useEffect(() => {
    //get random number to get random index from slide array
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    async function getRandomImages() {
      await fetch("http://localhost:5000/randomImages", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response
          .json()
          .then((resJSON) => JSON.stringify(resJSON))
          .then((stringJSON) => JSON.parse(stringJSON))
          .then((parsedJSON) => (slideArr = parsedJSON))
      );
      console.log(slideArr);
      //shuffling an array to get better randomization than just math.random
      var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

      function shuffle(o) {
        for (
          var j, x, i = o.length;
          i;
          j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
        );
        return o;
      }

      var random = shuffle(numbers);

      console.log(random + " random");

      setRandomGallery(
        slideArr.map((element, index) => {
          var imgSRC = slideArr[random[index]].secure_url;
          var author = slideArr[random[index]].uploadedBy;
          return (
            <div key={index} className="mainPage__randomGallery-div">
              <img src={imgSRC} className="mainPage__randomGallery-img"></img>
              <FontAwesomeIcon
                icon={farHeart}
                className="mainPage__randomGallery-heart"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faDownload}
                className="mainPage__randomGallery-download"
              ></FontAwesomeIcon>
              <p>{author}</p>
            </div>
          );
        })
      );
    }
    getRandomImages();
  }, []);

  return (
    <div>
      <div className="mainPage__bg">
        <MainPageNavBar curUser={curUser} loggedIn={loggedIn} />
        {/* <DropDown /> */}
        <Carousel2 />
      </div>
      <div className="mainPage__randomGallery-container">
        <div className="mainPage__randomGallery-sorting">
          <button>Most Recent</button>
          <button>Most Popular</button>
        </div>
        <h1>Free Stock Photos</h1>
        <div className="mainPage__randomGallery-gallery">{randomGallery}</div>
      </div>
    </div>
  );
};

export default MainPage;

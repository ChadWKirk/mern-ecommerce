import React, { useState, useEffect, useRef } from "react";
import MainPageNavBar from "../components/MainPageNavBar";
import Carousel2 from "../components/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MainPage = ({ curUser, loggedIn }) => {
  //on load, fetch random images and use them as variables in the img src
  //resJSON will be an array of secure_url's
  const [randomGallery, setRandomGallery] = useState([]);
  const [isLiked, setIsLiked] = useState();

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
          var likeButton;
          if (element.likedBy == curUser) {
            likeButton = (
              <FontAwesomeIcon
                onClick={(e) => handleLike(e)}
                icon={isLiked ? faHeart : farHeart}
                className="mainPage__randomGallery-heart heartRed"
              ></FontAwesomeIcon>
            );
          } else {
            likeButton = (
              <FontAwesomeIcon
                onClick={(e) => handleLike(e)}
                icon={isLiked ? faHeart : farHeart}
                className="mainPage__randomGallery-heart"
              ></FontAwesomeIcon>
            );
          }
          return (
            <div key={index} className="mainPage__randomGallery-div">
              <img src={imgSRC} className="mainPage__randomGallery-img"></img>
              <div className="mainPage__randomGallery-imgOverlay">
                <a
                  assetID={element.asset_id}
                  className="mainPage__randomGallery-heartA"
                  onClick={(e) => handleLike(e)}
                >
                  {/* put like button here based on likedBy if statement ^^^ */}
                  <FontAwesomeIcon
                    icon={farHeart}
                    className="mainPage__randomGallery-heart"
                  ></FontAwesomeIcon>
                </a>
                <a className="mainPage__randomGallery-downloadA">
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="mainPage__randomGallery-download"
                  ></FontAwesomeIcon>
                </a>
                <p>{author}</p>
              </div>
            </div>
          );
        })
      );
    }
    getRandomImages();
  }, []);

  async function handleLike(e) {
    setIsLiked(!isLiked);
    console.log(e);
    if (isLiked) {
      //use asset ID in E to make GET request and add curUser to that
      //asset ID's image's likedBy array
    } else {
      //use asset ID in E to make GET request and remove curUser from
      //that asset ID's image's likedBy array
    }
  }

  const [isActiveRec, setActiveRec] = useState(true);
  const [isActivePop, setActivePop] = useState(false);

  function handleClickRec() {
    if (isActiveRec) {
      setActiveRec(true);
    } else if (!isActiveRec) {
      setActiveRec(true);
      setActivePop(false);
    }
  }

  function handleClickPop() {
    if (isActiveRec) {
      setActivePop(true);
      setActiveRec(false);
    } else if (!isActivePop) {
      setActivePop(true);
      setActiveRec(false);
    }
  }

  return (
    <div>
      <div className="mainPage__bg">
        <MainPageNavBar curUser={curUser} loggedIn={loggedIn} />
        {/* <DropDown /> */}
        <Carousel2 />
      </div>
      <div className="mainPage__randomGallery-container">
        <div className="mainPage__randomGallery-sorting">
          <button
            onClick={() => handleClickRec()}
            className={isActiveRec ? "buttonClicked" : "buttonNotClicked"}
          >
            Most Recent
          </button>
          <button
            onClick={() => handleClickPop()}
            className={isActivePop ? "buttonClicked" : "buttonNotClicked"}
          >
            Most Popular
          </button>
        </div>
        <h1>Free Stock Photos</h1>
        <div className="mainPage__randomGallery-gallery">{randomGallery}</div>
        <a href="/signup">
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              fontSize: "2.5rem",
              borderRadius: "30px",
              padding: "1.5rem",
            }}
          >
            Sign Up!
          </button>
        </a>
      </div>
    </div>
  );
};

export default MainPage;

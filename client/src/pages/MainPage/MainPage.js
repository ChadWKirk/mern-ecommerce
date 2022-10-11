import React, { useState, useEffect, useRef } from "react";
import MainPageNavBar from "../../components/MainPageNavBar";
import Carousel2 from "../../components/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import WhiteNavBar from "../../components/WhiteNavBar";

const MainPage = ({ curUser, loggedIn }) => {
  //sticky nav bar
  const [navPosition, setNavPosition] = useState("gone");

  useEffect(() => {
    window.addEventListener("scroll", setNavToFixed);

    return () => {
      window.removeEventListener("scroll", setNavToFixed);
    };
  }, []);

  function setNavToFixed() {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 425 ? setNavPosition("fixed") : setNavPosition("gone");
    }
  }

  //img array to display
  const [imgGallery, setImgGallery] = useState([]);
  //fetch img array
  const [fetchArr, setFetchArr] = useState([]);
  //like button array to change individual like buttons
  const [likeButtonArr, setLikeButtonArr] = useState([]);
  //isLiked just to re render array
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    console.log("run");

    async function getImages() {
      await fetch("http://localhost:5000/most-recent-images", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response
          .json()
          .then((resJSON) => JSON.stringify(resJSON))
          .then((stringJSON) => JSON.parse(stringJSON))
          .then((parsedJSON) => setFetchArr(parsedJSON))
      );
    }
    getImages();
  }, []);

  //map over img array
  useEffect(() => {
    console.log("run 2");
    console.log(likeButtonArr);
    //likeButtonCopy
    var likeButtonArrCopy = [...likeButtonArr];
    likeButtonArrCopy = [];
    var mapResult = fetchArr.map((element, index) => {
      var imgSRC = fetchArr[index].secure_url;
      var author = fetchArr[index].uploadedBy;
      var likeButton;
      var likedByArr = fetchArr[index].likedBy; //stops updating after some uses due to isLike not changing
      var assetid = fetchArr[index].asset_id;

      if (likedByArr.includes(curUser)) {
        likeButtonArrCopy.push({ isLiked: true, idx: index });
        likeButton = (
          <div>
            <FontAwesomeIcon
              icon={faHeart}
              className={`mainPage__randomGallery-heart heartRed`}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={farHeart}
              className={`opacity0${
                likeButtonArrCopy[index].isLiked
                  ? ""
                  : " mainPage__fetchArr-heart"
              }`}
            ></FontAwesomeIcon>
          </div>
        );
      } else {
        likeButtonArrCopy.push({ isLiked: false, idx: index });
        likeButton = (
          <div>
            <FontAwesomeIcon
              icon={faHeart}
              className={`opacity0${
                likeButtonArrCopy[index].isLiked
                  ? ""
                  : " mainPage__randomGallery-heart heartRed"
              }`}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={farHeart}
              className={`mainPage__randomGallery-heart
                ${likeButtonArrCopy[index].isLiked ? "opacity0" : ""}`}
            ></FontAwesomeIcon>
          </div>
        );
      }
      setLikeButtonArr(likeButtonArrCopy);
      return (
        <div key={index} className="mainPage__randomGallery-div">
          <img src={imgSRC} className="mainPage__randomGallery-img"></img>
          <div className="mainPage__randomGallery-imgOverlay">
            <a
              assetid={assetid}
              likedby={likedByArr}
              className="mainPage__randomGallery-heartA"
              onClick={(e) => handleLike(e, index, likedByArr, assetid)}
              idx={index}
            >
              {likeButton}
            </a>
            <a className="mainPage__randomGallery-downloadA">
              <FontAwesomeIcon
                icon={faDownload}
                className="mainPage__randomGallery-download"
              ></FontAwesomeIcon>
            </a>
            <a className="mainPage__randomGallery-overlayAuthor">{author}</a>
          </div>
        </div>
      );
    });
    setImgGallery(mapResult);
  }, [fetchArr, isLiked]);

  async function handleLike(e, index, likedByArr, assetid) {
    setIsLiked(!isLiked);
    if (likedByArr.includes(curUser)) {
      await fetch(`http://localhost:5000/removeLikedBy/${assetid}/${curUser}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
    } else if (!likedByArr.includes(curUser)) {
      await fetch(`http://localhost:5000/addLikedBy/${assetid}/${curUser}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
    }
  }

  return (
    <div>
      <div className="mainPage__bg">
        <MainPageNavBar curUser={curUser} loggedIn={loggedIn} />
        <div className={`${navPosition}`}>
          <WhiteNavBar curUser={curUser} loggedIn={loggedIn} />
        </div>
        <Carousel2 />
      </div>
      <div className="mainPage__randomGallery-container">
        <div className="mainPage__randomGallery-sorting">
          <a>
            <button className="buttonClicked">Most Recent</button>
          </a>
          <a href="/most-popular">
            <button className="buttonNotClicked">Most Popular</button>
          </a>
        </div>
        <h1>Free Stock Photos</h1>
        <div className="mainPage__randomGallery-gallery">{imgGallery}</div>
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

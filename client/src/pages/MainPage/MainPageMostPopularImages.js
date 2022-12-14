import React, { useState, useEffect, useRef } from "react";
import MainPageNavBar from "../../components/MainPageNavBar";
import Carousel2 from "../../components/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";
import WhiteNavBar from "../../components/WhiteNavBar";

const MainPageMostPopularImages = ({ curUser, loggedIn }) => {
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

  let navigate = useNavigate();
  //on load, fetch random images and use them as variables in the img src
  //resJSON will be an array of secure_url's
  const [randomGallery, setRandomGallery] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  var slideArr = [];

  useEffect(() => {
    //get random number to get random index from slide array
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    async function getNewImages() {
      await fetch("http://localhost:5000/most-popular", {
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

      setRandomGallery(
        slideArr.map((element, index) => {
          var imgSRC = slideArr[index].secure_url;
          var author = slideArr[index].uploadedBy;
          var likeButton;
          // console.log(slideArr[2].likedBy.includes(curUser));
          if (slideArr[index].likedBy.includes(curUser)) {
            likeButton = (
              <div>
                <FontAwesomeIcon
                  onClick={(e) => handleLike(e)}
                  icon={faHeart}
                  className="likeButtonHeart1 likeButtonLikedFill1"
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  onClick={(e) => handleLike(e)}
                  icon={farHeart}
                  className="likeButtonHeart1 opacity0"
                ></FontAwesomeIcon>
              </div>
            );
          } else {
            likeButton = (
              <div>
                <FontAwesomeIcon
                  onClick={(e) => handleLike(e)}
                  icon={faHeart}
                  className="likeButtonHeart1 likeButtonLikedFill1 opacity0"
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  onClick={(e) => handleLike(e)}
                  icon={farHeart}
                  className="likeButtonHeart1"
                ></FontAwesomeIcon>
              </div>
            );
          }
          return (
            <div key={index} className="imgGalleryImgCont1">
              <img src={imgSRC} className="imgGalleryImg1"></img>
              <div className="imgGalleryImgOverlay1">
                <a
                  assetid={slideArr[index].asset_id}
                  likedby={slideArr[index].likedBy}
                  className="likeButtonContainer1"
                  onClick={(e) => handleLike(e)}
                >
                  {/* put like button here based on likedBy if statement ^^^ */}
                  {likeButton}
                </a>
                <a className="downloadButtonCont1">
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="downloadButton1"
                  ></FontAwesomeIcon>
                </a>
                <a className="imgAuthor1">{author}</a>
              </div>
            </div>
          );
        })
      );
    }
    getNewImages();
  }, [isLiked]);
  //only runs 6 times. one more than array length. coincidence?
  async function handleLike(e) {
    // console.log(e.target.attributes);
    let currentLikedByArr = e.target.attributes[1].value;
    let imgAssetID = e.target.attributes[0].value;
    setIsLiked(!isLiked);
    if (currentLikedByArr.includes(curUser)) {
      await fetch(
        `http://localhost:5000/removeLikedBy/${imgAssetID}/${curUser}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
        }
      );
      console.log(currentLikedByArr);
    } else if (!currentLikedByArr.includes(curUser)) {
      await fetch(`http://localhost:5000/addLikedBy/${imgAssetID}/${curUser}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
      console.log(currentLikedByArr);
    }

    // if (isLiked) {
    //   //use asset ID in E to make GET request and add curUser to that
    //   //asset ID's image's likedBy array
    // } else {
    //   //use asset ID in E to make GET request and remove curUser from
    //   //that asset ID's image's likedBy array
    // }
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
        <div className={`${navPosition}`}>
          <WhiteNavBar curUser={curUser} loggedIn={loggedIn} />
        </div>
        {/* <DropDown /> */}
        <Carousel2 />
      </div>
      <div className="imgGallerySectionCont1">
        <div className="sortingBarCont1">
          <a href="/">
            <button className="buttonNotClicked">Most Recent</button>
          </a>
          <a>
            <button className="buttonClicked">Most Popular</button>
          </a>
        </div>
        <h1>Free Stock Photos</h1>
        <div className="imgGalleryCont1">{randomGallery}</div>
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

export default MainPageMostPopularImages;

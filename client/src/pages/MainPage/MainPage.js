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

  //on load, fetch random images and use them as variables in the img src
  //resJSON will be an array of secure_url's
  const [randomGallery, setRandomGallery] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [slideArr, setSlideArr] = useState([]);
  const [likeButtonArr, setLikeButtonArr] = useState([]);

  var newArr = [];
  const [likedByArr, setLikedByArr] = useState([]);

  useEffect(() => {
    //get random number to get random index from slide array
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    async function getRandomImages() {
      await fetch("http://localhost:5000/most-recent-images", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response
          .json()
          .then((resJSON) => JSON.stringify(resJSON))
          .then((stringJSON) => JSON.parse(stringJSON))
          .then((parsedJSON) => setSlideArr(parsedJSON))
      );
    }
    getRandomImages();
  }, []);

  useEffect(() => {
    console.log(slideArr);
    console.log("useEffect");
    //shuffling an array to get better randomization than just math.random
    // var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // function shuffle(o) {
    //   for (
    //     var j, x, i = o.length;
    //     i;
    //     j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    //   );
    //   return o;
    // }

    // var random = shuffle(numbers);

    // console.log(random + " random");

    newArr = slideArr.map((element, index) => {
      // console.log("map run");
      var imgSRC = slideArr[index].secure_url;
      var author = slideArr[index].uploadedBy;
      var likeButton;
      var likedByArrCopy = [...likedByArr];
      var push = likedByArrCopy.push(slideArr[index].likedBy);
      setLikedByArr((likedByArr) => [...likedByArr, likedByArrCopy]);
      console.log(likedByArr);
      // console.log(slideArr[2].likedBy.includes(curUser));

      if (slideArr[index].likedBy.includes(curUser)) {
        likeButtonArr.push({ isLiked: true, idx: index });
        // console.log(likeButtonArr[index].isLiked);
        likeButton = (
          <div>
            <FontAwesomeIcon
              icon={faHeart}
              className={`mainPage__randomGallery-heart heartRed${
                likeButtonArr[index].isLiked ? "" : " opacity0"
              }`}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={farHeart}
              className={`opacity0${
                likeButtonArr[index].isLiked
                  ? ""
                  : " mainPage__randomGallery-heart"
              }`}
            ></FontAwesomeIcon>
          </div>
        );
      } else {
        likeButtonArr.push({ isLiked: false, idx: index });
        // console.log(likeButtonArr[index].isLiked);
        likeButton = (
          <div>
            <FontAwesomeIcon
              icon={faHeart}
              className={`opacity0${
                likeButtonArr[index].isLiked
                  ? ""
                  : " mainPage__randomGallery-heart heartRed"
              }`}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={farHeart}
              className={`mainPage__randomGallery-heart
                ${likeButtonArr[index].isLiked ? "opacity0" : ""}`}
            ></FontAwesomeIcon>
          </div>
        );
      }
      return (
        <div key={index} className="mainPage__randomGallery-div">
          <img src={imgSRC} className="mainPage__randomGallery-img"></img>
          <div className="mainPage__randomGallery-imgOverlay">
            <a
              assetid={slideArr[index].asset_id}
              likedby={slideArr[index].likedBy}
              className="mainPage__randomGallery-heartA"
              onClick={(e) => handleLike(e, index, likedByArr)}
              idx={index}
            >
              {/* put like button here based on likedBy if statement ^^^ */}
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
    setRandomGallery(newArr);
  }, [slideArr]);

  //only runs 6 times. one more than array length. coincidence?
  async function handleLike(e, index, likedByArr) {
    let imgAssetID = e.target.attributes[0].value;
    console.log(slideArr);
    console.log("handle like");
    console.log(likedByArr);
    if (likedByArr.includes(curUser)) {
      var slideArrCopy = [...slideArr];

      slideArrCopy[index].likedBy = slideArrCopy[index].likedBy.filter(
        (user) => user !== curUser
      );

      setSlideArr(slideArrCopy);
      console.log(slideArrCopy);
      console.log("copy");

      var likeButtonArrCopy = [...likeButtonArr];
      likeButtonArrCopy[index].isLiked = false;
      setLikeButtonArr(likeButtonArrCopy);

      await fetch(
        `http://localhost:5000/removeLikedBy/${imgAssetID}/${curUser}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
        }
      );
    } else if (!likedByArr.includes(curUser)) {
      await fetch(`http://localhost:5000/addLikedBy/${imgAssetID}/${curUser}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
      var slideArrCopy = [...slideArr];

      slideArrCopy[index].likedBy.push(curUser);
      setSlideArr(slideArrCopy);

      console.log(slideArrCopy);
      console.log("copy");

      var likeButtonArrCopy = [...likeButtonArr];
      likeButtonArrCopy[index].isLiked = true;
      setLikeButtonArr(likeButtonArrCopy);
    }

    // console.log(likeButtonArr[e.target.attributes[1].value].isLiked);

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

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
  //isLiked just to re render array
  const [isLiked, setIsLiked] = useState(false);

  var mapArr;

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
    mapArr = fetchArr.map((element, index) => {
      var likeButton;

      if (element.likedBy.includes(curUser)) {
        likeButton = (
          <div>
            <FontAwesomeIcon
              icon={faHeart}
              className="likeButtonHeart1 likeButtonLikedFill1"
            ></FontAwesomeIcon>
          </div>
        );
      } else {
        likeButton = (
          <div>
            <FontAwesomeIcon
              icon={farHeart}
              className="likeButtonHeart1"
            ></FontAwesomeIcon>
          </div>
        );
      }
      return (
        <div key={index} className="imgGalleryImgCont1">
          <a
            href={
              element.secure_url.slice(0, 50) +
              "q_60/c_scale,w_1600/dpr_auto/" +
              element.secure_url.slice(
                50,
                element.secure_url.lastIndexOf(".")
              ) +
              ".jpg"
            }
          >
            <img
              src={
                element.secure_url.slice(0, 50) +
                "q_60/c_scale,w_1600/dpr_auto/" +
                element.secure_url.slice(
                  50,
                  element.secure_url.lastIndexOf(".")
                ) +
                ".jpg"
              }
              className="imgGalleryImg1"
            ></img>
          </a>

          <div className="imgGalleryImgOverlay1">
            <a
              className="likeButtonContainer1"
              onClick={(e) => handleLike(e, element, index)}
            >
              {likeButton}
            </a>
            <a className="downloadButtonCont1">
              <FontAwesomeIcon
                icon={faDownload}
                className="downloadButton1"
              ></FontAwesomeIcon>
            </a>
            <a className="imgAuthor1">{element.uploadedBy}</a>
          </div>
        </div>
      );
    });
    setImgGallery(mapArr);
  }, [fetchArr, isLiked]);

  async function handleLike(e, element, index) {
    var fetchArrCopy = fetchArr;

    if (fetchArrCopy[index].likedBy.includes(curUser)) {
      await fetch(
        `http://localhost:5000/removeLikedBy/${element.asset_id}/${curUser}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
        }
      ).then((res) => {
        fetchArrCopy[index].likedBy = fetchArrCopy[index].likedBy.filter(
          (user) => {
            return user !== curUser;
          }
        );
        setFetchArr(fetchArrCopy);
        console.log("run 3");
      });
    } else if (!fetchArrCopy[index].likedBy.includes(curUser)) {
      await fetch(
        `http://localhost:5000/addLikedBy/${element.asset_id}/${curUser}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
        }
      ).then((res) => {
        fetchArrCopy[index].likedBy.push(curUser);
        setFetchArr(fetchArrCopy);
        console.log("run 4");
      });
    }
    setIsLiked(!isLiked);
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
      <div className="imgGallerySectionCont1">
        <div className="sortingBarCont1">
          <a>
            <button className="buttonClicked">Most Recent</button>
          </a>
          <a href="/most-popular">
            <button className="buttonNotClicked">Most Popular</button>
          </a>
        </div>
        <h1>Free Stock Photos</h1>
        <div className="imgGalleryCont1">{imgGallery}</div>
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

import React, { useState, useEffect, useRef } from "react";
import MainPageNavBar from "../../components/MainPageNavBar";
import Carousel2 from "../../components/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import WhiteNavBar from "../../components/WhiteNavBar";
import { useParams } from "react-router-dom";

const SearchResultsPage = ({ curUser, loggedIn }) => {
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

  //the thing you searched to use for fetch request
  const { searchQuery } = useParams();
  //array of results from mongoDB that you can grab stuff from like title or likedBy etc.
  var searchArr = [];
  //array of stuff you decide to keep from mongoDB search (push from searchArr into resultsArr)
  var resultsArr = [];
  //isLiked just to re render array
  const [isLiked, setIsLiked] = useState(false);

  const [resultsMap, setResultsMap] = useState();

  useEffect(() => {
    console.log("run");

    async function searchFetch() {
      await fetch(`http://localhost:5000/search/${searchQuery}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response
          .json()
          .then((resJSON) => JSON.stringify(resJSON))
          .then((stringJSON) => JSON.parse(stringJSON))
          .then((parsedJSON) => (searchArr = parsedJSON))
      );
      //make everything lower case to allow case insensitive searching
      for (var i = 0; i < searchArr.length; i++) {
        if (
          searchArr[i].tags
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          searchArr[i].title
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) {
          resultsArr.push(searchArr[i]);
        }
      }
      var count = -1;
      //use split to get an array split by the /
      //only output the public_id after the last /. last index of array meaning length-1
      //replace all spaces with dashes
      setResultsMap(
        resultsArr.map((element, key) => {
          let parts = element.public_id.split("/");
          let result = parts[parts.length - 1];
          var likeButton;

          if (element.likedBy.includes(curUser)) {
            likeButton = (
              <div>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="mainPage__randomGallery-heart heartRed"
                ></FontAwesomeIcon>
              </div>
            );
          } else {
            likeButton = (
              <div>
                <FontAwesomeIcon
                  icon={farHeart}
                  className="mainPage__randomGallery-heart"
                ></FontAwesomeIcon>
              </div>
            );
          }
          return (
            <div key={count} className="mainPage__randomGallery-div">
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
                  className="mainPage__randomGallery-img"
                ></img>
              </a>

              <div className="mainPage__randomGallery-imgOverlay">
                <a
                  className="mainPage__randomGallery-heartA"
                  onClick={(e) => handleLike(e, element, count)}
                >
                  {likeButton}
                </a>
                <a className="mainPage__randomGallery-downloadA">
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="mainPage__randomGallery-download"
                  ></FontAwesomeIcon>
                </a>
                <a className="mainPage__randomGallery-overlayAuthor">
                  {element.uploadedBy}
                </a>
              </div>
            </div>
          );
        })
      );
    }
    searchFetch();
  }, []);

  // //map over img array
  // useEffect(() => {
  //   console.log("run 2");
  //   mapArr = fetchArr.map((element, index) => {

  //     );
  //   });
  //   setImgGallery(mapArr);
  // }, [fetchArr, isLiked]);

  async function handleLike(e, element, index) {
    var searchArrCopy = searchArr;

    if (searchArrCopy[index].likedBy.includes(curUser)) {
      await fetch(
        `http://localhost:5000/removeLikedBy/${element.asset_id}/${curUser}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
        }
      ).then((res) => {
        searchArrCopy[index].likedBy = searchArrCopy[index].likedBy.filter(
          (user) => {
            return user !== curUser;
          }
        );
        searchArr = searchArrCopy;
        console.log("run 3");
      });
    } else if (!searchArrCopy[index].likedBy.includes(curUser)) {
      await fetch(
        `http://localhost:5000/addLikedBy/${element.asset_id}/${curUser}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
        }
      ).then((res) => {
        searchArrCopy[index].likedBy.push(curUser);
        searchArr = searchArrCopy;
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
        <div className="gallery">{resultsMap}</div>
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

export default SearchResultsPage;

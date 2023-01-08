import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import WhiteNavBar from "../../components/WhiteNavBar";
import { useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const SearchResultsPage = ({ curUser, loggedIn }) => {
  let navigate = useNavigate();

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

  //sort and filter values to do get requests
  const [sort, setSort] = useState("most-recent");
  const [filter, setFilter] = useState("all-types");
  //sort and filter values to change the titles of the dropdown menus
  const [sortTitle, setSortTitle] = useState("Most Recent");
  const [filterTitle, setFilterTitle] = useState("All Types");

  //the thing you searched to use for fetch request
  const { searchQuery } = useParams();
  //array of results from mongoDB that you can grab stuff from like title or likedBy etc.
  const [searchArr, setSearchArr] = useState([]);
  //array of stuff you decide to keep from mongoDB search (push from searchArr into resultsArr)
  var resultsArr = [];
  //isLiked just to re render array
  const [isLiked, setIsLiked] = useState(false);

  const [resultsMap, setResultsMap] = useState();

  var mapArr;

  useEffect(() => {
    console.log("run");

    navigate(`/search/${searchQuery}/${sort}/${filter}`);

    async function searchFetch() {
      await fetch(
        `http://localhost:5000/search/${searchQuery}/${sort}/${filter}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      ).then((response) =>
        response
          .json()
          .then((resJSON) => JSON.stringify(resJSON))
          .then((stringJSON) => JSON.parse(stringJSON))
          .then((parsedJSON) => setSearchArr(parsedJSON))
      );
      //make everything lower case to allow case insensitive searching
      // if (searchArr) {
      //   for (var i = 0; i < searchArr.length; i++) {
      //     if (
      //       searchArr[i].tags
      //         .toString()
      //         .toLowerCase()
      //         .includes(searchQuery.toLowerCase()) ||
      //       searchArr[i].title
      //         .toString()
      //         .toLowerCase()
      //         .includes(searchQuery.toLowerCase())
      //     ) {
      //       resultsArr.push(searchArr[i]);
      //     }
      //   }
      // }
    }
    searchFetch();
  }, [sort, filter]);

  useEffect(() => {
    console.log(searchArr);
    //use split to get an array split by the /
    //only output the public_id after the last /. last index of array meaning length-1
    //replace all spaces with dashes

    mapArr = searchArr.map((element, index) => {
      let parts = element.public_id.split("/");
      let result = parts[parts.length - 1];
      var likeButton;
      var count = -1;

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
    setResultsMap(mapArr);
  }, [searchArr, sort, filter, isLiked]);

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
        setSearchArr(searchArrCopy);
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
        setSearchArr(searchArrCopy);
        console.log("run 4");
      });
    }
    setIsLiked(!isLiked);
  }

  return (
    <div>
      <WhiteNavBar curUser={curUser} loggedIn={loggedIn} />
      <div className={`${navPosition}`}>
        <WhiteNavBar curUser={curUser} loggedIn={loggedIn} />
      </div>
      <div className="imgGallerySectionCont1">
        <h1>{searchQuery} Images</h1>
        <div className="myPicsGallerySortBar-leftContainer">
          <DropdownButton
            className="galleryDropDownButton"
            title={`${sortTitle}`}
          >
            <Dropdown.Item
              className="galleryDropDownItem"
              onClick={() => {
                setSort("most-recent");
                setSortTitle("Most Recent");
              }}
            >
              Most Recent
            </Dropdown.Item>
            <Dropdown.Item
              className="galleryDropDownItem"
              onClick={() => {
                setSort("oldest");
                setSortTitle("Oldest");
              }}
            >
              Oldest
            </Dropdown.Item>
            <Dropdown.Item
              className="galleryDropDownItem"
              onClick={() => {
                setSort("aToz");
                setSortTitle("A - Z");
              }}
            >
              A - Z
            </Dropdown.Item>
            <Dropdown.Item
              className="galleryDropDownItem"
              onClick={() => {
                setSort("zToa");
                setSortTitle("Z - A");
              }}
            >
              Z - A
            </Dropdown.Item>
            <Dropdown.Item
              className="galleryDropDownItem"
              onClick={() => {
                setSort("leastLikes");
                setSortTitle("Least Popular");
              }}
            >
              Least Popular
            </Dropdown.Item>
            <Dropdown.Item
              className="galleryDropDownItem"
              onClick={() => {
                setSort("mostLikes");
                setSortTitle("Popular");
              }}
            >
              Popular
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            className="galleryDropDownButton"
            title={`${filterTitle}`}
          >
            <Dropdown.Item
              className="galleryDropDownItem"
              onClick={() => {
                setFilter("all-types");
                setFilterTitle("All Types");
              }}
            >
              All types
            </Dropdown.Item>
            <Dropdown.Item
              className="galleryDropDownItem"
              onClick={() => {
                setFilter("photo");
                setFilterTitle("Photo");
              }}
            >
              Photo
            </Dropdown.Item>
            <Dropdown.Item
              className="galleryDropDownItem"
              onClick={() => {
                setFilter("illustration");
                setFilterTitle("Illustration");
              }}
            >
              Illustration
            </Dropdown.Item>
          </DropdownButton>
        </div>

        <div className="imgGalleryCont1">{resultsMap}</div>
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

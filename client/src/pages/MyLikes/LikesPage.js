import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "react-bootstrap/DropdownButton";

const LikesPage = ({ curUser, loggedIn }) => {
  let navigate = useNavigate();

  var likesArr = [];
  var resultsArr = [];
  const [resultsMap, setResultsMap] = useState();
  //isLiked just to re render array
  const [isLiked, setIsLiked] = useState(false);

  const [sort, setSort] = useState("most-recent");
  const [filter, setFilter] = useState("all-types");

  const [sortTitle, setSortTitle] = useState("Most Recent");
  const [filterTitle, setFilterTitle] = useState("All Types");

  useEffect(() => {
    navigate(`/Account/${curUser}/Likes/${sort}/${filter}`);

    async function searchFetch() {
      await fetch(`http://localhost:5000/${curUser}/likes`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response
          .json()
          .then((resJSON) => JSON.stringify(resJSON))
          .then((stringJSON) => JSON.parse(stringJSON))
          .then((parsedJSON) => (likesArr = parsedJSON))
      );
      console.log(likesArr);
      // //make everything lower case to allow case insensitive searching
      for (var i = 0; i < likesArr.length; i++) {
        // if (
        //   likesArr[i].tags
        //     .toString()
        //     .toLowerCase()
        //     .includes(searchQuery.toLowerCase()) ||
        //   likesArr[i].public_id
        //     .toString()
        //     .toLowerCase()
        //     .includes(searchQuery.toLowerCase())
        // ) {
        resultsArr.push(likesArr[i]);
        // }
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
            <div key={count} className="imgGalleryImgCont1">
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
                  onClick={(e) => handleLike(e, element, count)}
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
        })
      );
    }
    searchFetch();
  }, [sort, filter]);

  async function handleLike(e, element, count) {
    var likesArrCopy = likesArr;

    if (likesArrCopy[count + 1].likedBy.includes(curUser)) {
      await fetch(
        `http://localhost:5000/removeLikedBy/${element.asset_id}/${curUser}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
        }
      ).then((res) => {
        likesArrCopy[count + 1].likedBy = likesArrCopy[
          count + 1
        ].likedBy.filter((user) => {
          return user !== curUser;
        });
        likesArr = likesArrCopy;
        console.log("run 3");
      });
    } else if (!likesArrCopy[count + 1].likedBy.includes(curUser)) {
      await fetch(
        `http://localhost:5000/addLikedBy/${element.asset_id}/${curUser}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
        }
      ).then((res) => {
        likesArrCopy[count + 1].likedBy.push(curUser);
        likesArr = likesArrCopy;
        console.log("run 4");
      });
    }
    setIsLiked(!isLiked);
  }

  return (
    <div>
      <NavBar curUser={curUser} loggedIn={loggedIn} />
      <div className="galleryContainer">
        <div className="galleryHeadingAndSortContainer">
          <div className="galleryHeading">
            <h2>Your Likes</h2>
            <p>x images and x videos liked by curUser link</p>
          </div>
        </div>
        <div className="gallerySortBar d-flex">
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
        <div
          className="imgGalleryCont1"
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          {resultsMap}
        </div>
      </div>
    </div>
  );
};

export default LikesPage;

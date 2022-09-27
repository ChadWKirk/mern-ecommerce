import { React, useEffect, useState } from "react";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan as farTrashCan } from "@fortawesome/free-regular-svg-icons";

const LikeTestPage = () => {
  //give an array to map over
  const startArr = [1, 2];
  //map results array
  const [mapArr, setMapArr] = useState();
  useEffect(() => {
    //set up counter to represent index of item in map arr
    var count = -1;
    //set up an attribute to see if each button is acting individually
    var liked;
    //attributes[4] is className
    function changeLikeStatus(e, liked) {
      if (
        e.target.farthestViewportElement.attributes[4].value ==
        "svg-inline--fa fa-heart liked invis"
      ) {
        e.target.farthestViewportElement.attributes[4].value =
          "svg-inline--fa fa-heart liked";
      } else {
        e.target.farthestViewportElement.attributes[4].value =
          "svg-inline--fa fa-heart liked invis";
      }
      console.log("like");
    }
    //put this on entire button so you can remove entire button if clicking trash can
    function deleteFunction(e) {
      if (
        e.target.nearestViewportElement.attributes[4].value ==
        "svg-inline--fa fa-trash-can delete"
      ) {
        e.target.ownerDocument.activeElement.className = "gone";
      }
    }
    setMapArr(
      startArr.map((element) => {
        //increment each of these per element of map array
        count = count + 1;

        return (
          <div key={count}>
            <button
              className="emptyButton"
              onClick={(e, className) => deleteFunction(e, className)}
            >
              <FontAwesomeIcon
                liked="false"
                className="default"
                icon={farHeart}
              />

              <FontAwesomeIcon
                liked="true"
                className="liked invis"
                onClick={(e, liked) => changeLikeStatus(e, liked)}
                icon={faHeart}
              />

              <FontAwesomeIcon
                liked="del"
                className="delete"
                icon={farTrashCan}
              />
            </button>
          </div>
        );
      })
    );
  }, []);

  return <div>{mapArr}</div>;
};

export default LikeTestPage;

import { React, useEffect, useState } from "react";

const LikeTestPage = () => {
  //give an array to map over
  const startArr = [1, 2];
  //map results array
  const [mapArr, setMapArr] = useState();
  //content of button
  const [likeStatus, setLikeStatus] = useState("like");
  useEffect(() => {
    //set up counter to represent index of item in map arr
    var count = -1;
    //set up an attribute to see if each button is acting individually
    var likeCounter = 0;

    function changeLikeStatus(e) {
      if (e.target.innerHTML == "like") {
        setLikeStatus("unlike");
        e.target.innerHTML = "unlike";
        e.target.attributes[0].value = "liked";
        console.log("test");
      } else {
        setLikeStatus("like");
        e.target.innerHTML = "like";
        e.target.attributes[0].value = "default";
      }
      console.log(e);
    }
    setMapArr(
      startArr.map((element) => {
        //increment each of these per element of map array
        count = count + 1;
        likeCounter = likeCounter + 1;

        return (
          <div key={count}>
            <button
              className="default"
              likes={likeCounter}
              onClick={(e) => changeLikeStatus(e)}
            >
              like
            </button>
          </div>
        );
      })
    );
  }, [likeStatus]); //re-render every time likeStatus changes.
  //doesn't work until both buttons are changed for some reason

  return <div>{mapArr}</div>;
};

export default LikeTestPage;

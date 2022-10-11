import { React, useEffect, useState } from "react";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LikeTestPage = () => {
  const [imgArr, setImgArr] = useState([]);
  const [fetchArr, setFetchArr] = useState([]);
  const [like, setLike] = useState(false);

  var mapArr;

  useEffect(() => {
    setFetchArr([
      { url: "url", likedBy: ["chad"] },
      { url: "url", likedBy: [] },
      { url: "url", likedBy: ["lisa"] },
    ]);
  }, []);

  useEffect(() => {
    mapArr = fetchArr.map((element, index) => {
      return (
        <button
          onClick={() => handleLike(element, index)}
          className={`${element.likedBy.includes("chad") ? "blue" : ""}`}
        >
          Like
        </button>
      );
    });

    setImgArr(mapArr);
  }, [fetchArr, like]);

  function handleLike(element, index) {
    setLike(!like);
    var fetchArrCopy = fetchArr;

    if (fetchArrCopy[index].likedBy.includes("chad")) {
      fetchArrCopy[index].likedBy = fetchArrCopy[index].likedBy.filter(
        (user) => {
          return user !== "chad";
        }
      );
      setFetchArr(fetchArrCopy);
    } else if (!fetchArrCopy[index].likedBy.includes("chad")) {
      fetchArrCopy[index].likedBy.push("chad");
      setFetchArr(fetchArrCopy);
    }
  }

  return <div>{imgArr}</div>;
};

export default LikeTestPage;

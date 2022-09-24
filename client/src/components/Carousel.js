import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const Carousel2 = () => {
  //on load, fetch 5 random images and use them as variables in the img src
  //resJSON will be an array of secure_url's
  const [slide1, setSlide1] = useState();
  const [slide2, setSlide2] = useState();
  const [slide3, setSlide3] = useState();
  const [slide4, setSlide4] = useState();
  const [slide5, setSlide5] = useState();
  const [slide6, setSlide6] = useState();
  const [slide7, setSlide7] = useState();

  var slideArr = [];

  //for bootstrap carousel controls
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    //get random number to get random index from slide array
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    async function getCarouselImages() {
      await fetch("http://localhost:5000/carouselImages", {
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
      //shuffling an array to get better randomization than just math.random
      var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

      function shuffle(o) {
        for (
          var j, x, i = o.length;
          i;
          j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
        );
        return o;
      }

      var random = shuffle(numbers);

      console.log(random + " randommm");

      setSlide1(slideArr[random[0]].secure_url);
      setSlide2(slideArr[random[1]].secure_url);
      setSlide3(slideArr[random[2]].secure_url);
      setSlide4(slideArr[random[3]].secure_url);
      setSlide5(slideArr[random[4]].secure_url);
      setSlide6(slideArr[random[5]].secure_url);
      setSlide7(slideArr[random[6]].secure_url);
    }
    getCarouselImages();
  }, []);

  return (
    <Carousel
      pause={false}
      activeIndex={index}
      onSelect={handleSelect}
      className="carousel"
    >
      <Carousel.Item>
        <img className="d-block w-100" src={slide1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={slide2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={slide3}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={slide4}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={slide5}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={slide6}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={slide7}
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousel2;

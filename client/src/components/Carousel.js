import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import imageTest from "./nature-4k-pc-full-hd-wallpaper-preview.jpg";

const Carousel2 = () => {
  //on load, fetch 5 random images and use them as variables in the img src
  //resJSON will be an array of secure_url's
  const [slide1, setSlide1] = useState();
  const [slide2, setSlide2] = useState();
  const [slide3, setSlide3] = useState();
  const [slideArr, setSlideArr] = useState();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    async function getCarouselImages() {
      await fetch("http://localhost:5000/carouselImages", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) =>
        response.json().then((resJSON) => console.log(resJSON))
      );
      // .then((resJSON) => console.log(resJSON));
    }

    getCarouselImages();
  }, []);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={slide1}
          alt="First slide"
        />
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
    </Carousel>
  );
};

export default Carousel2;

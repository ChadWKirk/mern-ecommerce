import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import imageTest from "./nature-4k-pc-full-hd-wallpaper-preview.jpg";

const Carousel2 = () => {
  //on load, fetch 5 random images and use them as variables in the img src

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          height={400}
          src={imageTest}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousel2;

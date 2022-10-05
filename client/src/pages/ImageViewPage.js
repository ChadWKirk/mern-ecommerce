import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";

import { AiFillLike } from "react-icons/ai";

const ImageViewPage = ({ curUser, loggedIn }) => {
  //on load, pull image using public id in url

  return (
    <div>
      <NavBar curUser={curUser} loggedIn={loggedIn} />
      <DropDown />
      <div className="imageViewContainer">
        <div className="imageViewDetailsContainer">
          <img
            alt="broken"
            src={require("./nature-4k-pc-full-hd-wallpaper-preview.jpg")}
          ></img>
          <div className="imageViewDetailsContainerTitle">
            public id of image (without dashes)
          </div>
          <div className="imageViewDetailsContainerLikesContainer">
            <div className="likebutton">
              <AiFillLike />
            </div>
            <div className="likeCounter">number of likes</div>
          </div>
          <div className="imageViewDescription">
            description of image inputted by uploader
          </div>
          <div className="imageViewTags">
            <ul>
              <Button>tag 1</Button>
              <Button>tag 2</Button>
              <Button>tag 3</Button>
              <Button>tag 4</Button>
              <Button>tag 5</Button>
            </ul>
          </div>
        </div>
        <div className="imageViewPurchaseContainer">
          <div>Price</div>
          <div>Add To Cart Button</div>
          <div>Free Download Button (if price = free)</div>
          <div>
            Buy Now Button (if price != free. skip add to cart and go to
            checkout)
          </div>
        </div>
      </div>
      <div className="relatedImagesContainer">
        <div className="relatedImagesTitle">Related Images</div>
        <div className="relatedImagesGalleryContainer">
          <img
            alt="broken"
            src={require("./nature-4k-pc-full-hd-wallpaper-preview.jpg")}
          ></img>
          <img
            alt="broken"
            src={require("./nature-4k-pc-full-hd-wallpaper-preview.jpg")}
          ></img>
          <img
            alt="broken"
            src={require("./nature-4k-pc-full-hd-wallpaper-preview.jpg")}
          ></img>
          <img
            alt="broken"
            src={require("./nature-4k-pc-full-hd-wallpaper-preview.jpg")}
          ></img>
          <img
            alt="broken"
            src={require("./nature-4k-pc-full-hd-wallpaper-preview.jpg")}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default ImageViewPage;

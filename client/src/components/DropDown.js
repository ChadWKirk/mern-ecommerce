import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DropDown = () => {
  return (
    <div className="d-flex dropDownMenu">
      <DropdownButton className="dropDownMenuButton" title="Animals">
        <Dropdown.Item className="dropDownMenuItem">Cats</Dropdown.Item>
        <Dropdown.Item>Dogs</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenuButton" title="Sports">
        <Dropdown.Item>Baseball</Dropdown.Item>
        <Dropdown.Item>Soccer</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenuButton" title="Technology">
        <Dropdown.Item>Computers</Dropdown.Item>
        <Dropdown.Item>Phones</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenuButton" title="Funny">
        <Dropdown.Item>Funny Pets</Dropdown.Item>
        <Dropdown.Item>Memes</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenuButton" title="Outdoors">
        <Dropdown.Item>Nature</Dropdown.Item>
        <Dropdown.Item>City</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenuButton" title="Automotive">
        <Dropdown.Item>Cars</Dropdown.Item>
        <Dropdown.Item>Trucks</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default DropDown;

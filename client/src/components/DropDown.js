import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DropDown = () => {
  return (
    <div className="d-flex flex-grow-0">
      <DropdownButton className="dropDownButton flex-even" title="Animals">
        <Dropdown.Item>Cats</Dropdown.Item>
        <Dropdown.Item>Dogs</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownButton" title="Sports">
        <Dropdown.Item>Baseball</Dropdown.Item>
        <Dropdown.Item>Soccer</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownButton" title="Technology">
        <Dropdown.Item>Computers</Dropdown.Item>
        <Dropdown.Item>Phones</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownButton" title="Funny">
        <Dropdown.Item>Funny Pets</Dropdown.Item>
        <Dropdown.Item>Memes</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownButton" title="Outdoors">
        <Dropdown.Item>Nature</Dropdown.Item>
        <Dropdown.Item>City</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownButton" title="Automotive">
        <Dropdown.Item>Cars</Dropdown.Item>
        <Dropdown.Item>Trucks</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default DropDown;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DropDown = () => {
  return (
    <div className="d-flex dropDownMenu">
      <DropdownButton className="dropDownMenu__button" title="Animals">
        <Dropdown.Item href="/search/Cats">Cats</Dropdown.Item>
        <Dropdown.Item href="/search/Dogs">Dogs</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenu__button" title="Sports">
        <Dropdown.Item href="/search/Baseball">Baseball</Dropdown.Item>
        <Dropdown.Item href="/search/Soccer">Soccer</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenu__button" title="Technology">
        <Dropdown.Item href="/search/Computers">Computers</Dropdown.Item>
        <Dropdown.Item href="/search/Phones">Phones</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenu__button" title="Funny">
        <Dropdown.Item href="/search/Funny-Pets">Funny Pets</Dropdown.Item>
        <Dropdown.Item href="/search/Memes">Memes</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenu__button" title="Outdoors">
        <Dropdown.Item href="/search/Nature">Nature</Dropdown.Item>
        <Dropdown.Item href="/search/City">City</Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenu__button" title="Automotive">
        <Dropdown.Item href="/search/Cars">Cars</Dropdown.Item>
        <Dropdown.Item href="/search/Trucks">Trucks</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default DropDown;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DropDown = () => {
  return (
    <div className="d-flex dropDownMenu">
      <DropdownButton className="dropDownMenuButton" title="Animals">
        <Dropdown.Item className="dropDownMenuItem" href="/search/Cats">
          Cats
        </Dropdown.Item>
        <Dropdown.Item className="dropDownMenuItem" href="/search/Dogs">
          Dogs
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenuButton" title="Sports">
        <Dropdown.Item className="dropDownMenuItem" href="/search/Baseball">
          Baseball
        </Dropdown.Item>
        <Dropdown.Item className="dropDownMenuItem" href="/search/Soccer">
          Soccer
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenuButton" title="Technology">
        <Dropdown.Item className="dropDownMenuItem" href="/search/Computers">
          Computers
        </Dropdown.Item>
        <Dropdown.Item className="dropDownMenuItem" href="/search/Phones">
          Phones
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenuButton" title="Funny">
        <Dropdown.Item className="dropDownMenuItem" href="/search/Funny-Pets">
          Funny Pets
        </Dropdown.Item>
        <Dropdown.Item className="dropDownMenuItem" href="/search/Memes">
          Memes
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenuButton" title="Outdoors">
        <Dropdown.Item className="dropDownMenuItem" href="/search/Nature">
          Nature
        </Dropdown.Item>
        <Dropdown.Item className="dropDownMenuItem" href="/search/City">
          City
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton className="dropDownMenuButton" title="Automotive">
        <Dropdown.Item className="dropDownMenuItem" href="/search/Cars">
          Cars
        </Dropdown.Item>
        <Dropdown.Item className="dropDownMenuItem" href="/search/Trucks">
          Trucks
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default DropDown;

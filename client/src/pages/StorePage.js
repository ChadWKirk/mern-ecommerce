import React from "react";
import NavBar from "../components/NavBar";
import SubBar from "../components/SubBar";
import FilterBar from "../components/FilterBar";
import CatalogSection from "../components/CatalogSection";
import Logo from "../components/Logo";

const ShoppingPage = ({ curUser, loggedIn }) => {
  return (
    <div>
      <Logo />
      <NavBar curUser={curUser} loggedIn={loggedIn} />
      <SubBar />
      <FilterBar />
      <CatalogSection />
    </div>
  );
};

export default ShoppingPage;

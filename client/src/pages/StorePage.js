import React from "react";
import NavBar from "../components/NavBar";
import CategorySection from "../components/CategorySection";
import FilterBar from "../components/FilterBar";
import CatalogSection from "../components/CatalogSection";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";

const ShoppingPage = ({ curUser, loggedIn }) => {
  return (
    <div>
      <div className="navContainer">
        <Logo />
        <SearchBar />
        <NavBar curUser={curUser} loggedIn={loggedIn} />
      </div>
      <CategorySection />
      <FilterBar />
      <CatalogSection />
    </div>
  );
};

export default ShoppingPage;

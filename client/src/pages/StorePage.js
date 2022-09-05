import React from "react";
import NavBar from "../components/NavBar";
import SubBar from "../components/SubBar";
import FilterBar from "../components/FilterBar";
import CatalogSection from "../components/CatalogSection";

const ShoppingPage = () => {
  return (
    <div>
      <h1>Shopping Page</h1>
      <NavBar />
      <SubBar />
      <FilterBar />
      <CatalogSection />
    </div>
  );
};

export default ShoppingPage;

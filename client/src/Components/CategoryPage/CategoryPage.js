import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../LandingPage/PageComponents";

const CategoryPage = () => {
  const [categoryProperties, setCategoryProperties] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const config = {
      headers: {
          "Content-Type": "application/json",
      },
  };
  useEffect(() => {
    axios
        .post(
            "api/property/category",
            { category: params.get("category") },
            config,
        )
        .then((res) => {
            setCategoryProperties(res.data.property);
        });
}, [params]);
  return (
    <div>
        <Navbar />
        CategoryPage
        {params.get("category")}
    </div>
  )
}

export default CategoryPage
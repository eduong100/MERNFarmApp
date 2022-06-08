import React, { useState } from "react";
import Index from "./components/index";
// We use Route in order to define the different routes of our application
import { Routes, Route } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import Show from "./components/show";
import New from "./components/new";
import Edit from "./components/edit";

const App = () => {
  let categories = useState(["fruit", "vegetable", "dairy"])[0];
  let navigate = useNavigate();

  return (
    <Routes>
      <Route exact path="/products" element={<Index />} />
      <Route
        path="/products/new"
        element={<New categories={categories} navigate={navigate} />}
      />
      <Route
        path="/products/:id/edit"
        element={<Edit categories={categories} navigate={navigate} />}
      />
      <Route path="/products/:id" element={<Show navigate={navigate} />} />
      <Route path="/" element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default App;

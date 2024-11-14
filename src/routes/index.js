import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import authRoutes from "./authentication";
import Header from "../components/Header";
import privateRoutes from "./private";
import NotFound from "../components/NotFound";

export default function MainRoute() {
  const token = localStorage.getItem("accessToken");
  return (
    <Router>
      {token && <Header />}
      <Routes>
        {!token &&
          authRoutes.map((item, index) => (
            <Route
              key={index}
              exact
              path={item.path}
              element={<item.component />}
            />
          ))}

        {token &&
          privateRoutes.map((item, index) => (
            <Route
              key={index}
              exact
              path={item.path}
              element={<item.component />}
            />
          ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

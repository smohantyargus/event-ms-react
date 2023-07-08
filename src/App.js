// import logo from './logo.svg';
import "./App.css";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "scenes/home";
import Events from "./scenes/events";
import Layout from "scenes/layout";
import Login from "scenes/login";
import Register from "scenes/register";

function App() {
  const mode = useSelector((state) => state.global.mode);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

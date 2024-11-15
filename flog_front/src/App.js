import React from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer";
import { Login } from "./components/login";
import { Registro } from "./components/Registro";
import { Ranking } from "./components/Ranking";
import { Partida } from "./components/Partida";
import { Recomendaciones } from "./components/Recomendaciones";

export const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Partida" element={<Partida />} />
          <Route path="/Recomendaciones" element={<Recomendaciones />} />
          <Route path="/Ranking" element={<Ranking />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Registro" element={<Registro />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

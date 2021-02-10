import React from "react";
import Posts from "../post/Posts";

const Home = () => (
  <div>
    <div className="jumbotron">
      <h2>Accueil</h2>
      <p className="lead">Bienvenue sur Family City</p>
    </div>
    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;

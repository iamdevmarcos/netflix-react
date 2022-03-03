import React, { useState, useEffect } from "react";
import "./App.css";

import Api from "./services/api";

import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      const list = await Api.getHomeList();
      setMovieList(list);

      const originals = list.filter((i) => i.slug === "originals");
      const randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      const chosen = originals[0].items.results[randomChosen];
    };

    loadAll();
  }, []);

  return (
    <div className="page">
      {/* Header */}

      {/* Destaque */}
      {featuredData && <FeaturedMovie item={featuredData} />}

      {/* Listas */}
      <section className="lists">
        {movieList.map((item, index) => (
          <MovieRow key={index} title={item.title} items={item.items} />
        ))}
      </section>

      {/* Footer */}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";

import "./styles/main.css";

import logo from "./assets/Logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAddBanner } from "./components/CreateAddBanner";

interface Game {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerURL}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <CreateAddBanner />
    </div>
  );
}

export default App;

import { FC } from "react";
import Head from "../components/Head";
import Header from "../components/Header";
import GameItem from "../components/GameItem";
import GamesFilters from "../components/GamesFilters";
import useFilteredGames from "../hooks/useFilteredGames";

const Games: FC = () => {
  const { games, filters, updateFilters } = useFilteredGames();
  return (
    <div className="font-sans pt-20 bg-gray-100">
      <Head title="Where to Play Futsal, Soccer or Football in Singapore" />
      <Header />

      <section className="pt-12">
        <div className="container px-48">
          <div className="flex -mx-4">
            <div className="w-1/3 px-4">
              <GamesFilters filters={filters} onChange={updateFilters} />
            </div>
            <div className="w-2/3 px-4">
              {games.map((game) => {
                return <GameItem key={game.game_id} game={game} />;
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games;

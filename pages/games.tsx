import { FC } from "react";
import GameItem from "../components/GameItem";
import GamesFilters from "../components/GamesFilters";
import GamesHeaderBox from "../components/GamesHeaderBox";
import Head from "../components/Head";
import Header from "../components/Header";
import useFilteredGames from "../hooks/useFilteredGames";

const Games: FC = () => {
  const { filters, games, reset, status, updateFilters } = useFilteredGames();
  return (
    <div className="font-sans bg-gray-100">
      <Head title="Where to Play Futsal, Soccer or Football in Singapore" />
      <Header />

      <section className="">
        <div className="container px-48">
          <div className="flex -mx-4">
            <div className="w-1/3 px-4">
              <div className="pt-24">
                <GamesFilters filters={filters} onChange={updateFilters} />
              </div>
            </div>
            <div className="w-2/3 px-4">
              <div className="pt-24 sticky top-0 z-10">
                <GamesHeaderBox
                  filters={filters}
                  onChangeFilters={updateFilters}
                  onResetFilters={reset}
                />
              </div>

              <div className="relative">
                {games.map((game) => {
                  return <GameItem key={game.game_id} game={game} />;
                })}
                {status === "fetching" && (
                  <div className="bg-gray-100 bg-opacity-50 absolute inset-0" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games;

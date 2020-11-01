import { Frown, Search } from "@styled-icons/feather";
import { FC } from "react";
import BackToTopButton from "../components/BackToTopButton";
import GameItem from "../components/GameItem";
import GamesFilters from "../components/GamesFilters";
import GamesHeaderBox from "../components/GamesHeaderBox";
import Head from "../components/Head";
import Header from "../components/Header";
import useFilteredGames from "../hooks/useFilteredGames";

const Games: FC = () => {
  const {
    dynamicFilters,
    filters,
    games,
    reset,
    status,
    updateFilters,
  } = useFilteredGames();
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Head title="Where to Play Futsal, Soccer or Football in Singapore" />
      <Header />

      <section>
        <div className="container lg:px-24 xl:px-48">
          <div className="flex -mx-4">
            <div className="w-1/3 px-4">
              <div className="pt-24 pb-24 md:sticky top-0 z-10 max-h-screen flex flex-col">
                <GamesFilters
                  dynamicFilters={dynamicFilters}
                  filters={filters}
                  onChange={updateFilters}
                  onReset={reset}
                />
              </div>
            </div>
            <div className="w-2/3 px-4 pb-24">
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
                {status === "fetching" &&
                  (games.length > 0 ? (
                    <div className="bg-gray-100 bg-opacity-50 absolute inset-0" />
                  ) : (
                    <div className="flex flex-col items-center px-24 my-12">
                      <Search
                        size="120"
                        strokeWidth="2"
                        className="text-gray-400"
                      />
                      <p className="text-lg text-center text-gray-600 leading-snug">
                        Please wait a moment while we are getting the games.
                      </p>
                    </div>
                  ))}
                {status === "idle" && games.length === 0 && (
                  <div className="flex flex-col items-center px-24 my-12">
                    <Frown
                      size="120"
                      strokeWidth="2"
                      className="text-gray-400"
                    />
                    <p className="text-lg text-center text-gray-600 leading-snug">
                      We couldn't find any games matching your criteria. Please
                      try again using different criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackToTopButton containerClassnames="lg:px-24 xl:px-48" />
    </div>
  );
};

export default Games;

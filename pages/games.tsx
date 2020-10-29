import { FC, useCallback, useEffect, useState } from "react";
import Axios from "axios";
import Head from "../components/Head";
import Header from "../components/Header";
import GameItem from "../components/GameItem";

export type Game = {
  game_details: string;
  date: string;
  game_id: string;
  status: string;
  price: string;
  player_count: string;
  match_status: string;
  game_img: string;
  status_for_mobile: string;
  ribbon_img: string;
  game_type_img: string;
};

type GamesAPIResponse = APIResponse & {
  data: Game[];
};

type APIResponse = {
  status: boolean;
  message: string;
};

const Games: FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const fetchGames = useCallback(async () => {
    try {
      const { data: responseBody } = await Axios.get<GamesAPIResponse>("/api", {
        params: { filename: "games.json" },
      });
      if (!responseBody.status) {
        throw new Error(responseBody.message);
      }
      setGames(responseBody.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <div className="font-sans pt-20 bg-gray-100">
      <Head title="Where to Play Futsal, Soccer or Football in Singapore" />
      <Header />

      <section className="pt-12">
        <div className="container px-48">
          <div className="flex -mx-2">
            <div className="w-1/4 px-2"></div>
            <div className="w-3/4 px-2">
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

import { ArrowRight } from "@styled-icons/feather";
import { FC } from "react";
import Link from "next/link";
import { Game } from "../hooks/useFilteredGames";

type Props = {
  game: Game;
};

const GameItem: FC<Props> = ({ game }) => {
  let statusClassnames = "bg-gray-200 text-gray-700";
  switch (game.status_for_mobile) {
    case "Confirmed":
      statusClassnames = "bg-green-200 text-green-600";
      break;
    case "Finalizing":
      statusClassnames = "bg-blue-200 text-blue-600";
      break;
  }

  return (
    <>
      <div className="bg-white shadow-md mb-4 rounded-lg flex h-48 items-stretch relative transition-shadow duration-200 hover:shadow-xl">
        <img
          src={game.game_img}
          alt={game.game_details}
          className="w-48 object-cover rounded-l-lg"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div className="px-4 py-4">
            <p className="text-xl font-medium leading-tight tracking-tight mb-1">
              {game.game_details}
            </p>
            <p className="text-gray-700 mb-2">{game.date}</p>
            <p>
              <span
                className={`inline-block rounded text-xs px-2 py-1 ${statusClassnames}`}
              >
                {game.status_for_mobile}
              </span>
            </p>
          </div>
          <div className="bg-gray-100 border-t px-4 py-2 flex items-center justify-between">
            <p className="text-primary-600 text-lg font-medium">
              S${game.price.split(".")[0]}
              <span className="text-xs align-text-top pl-px">
                {game.price.split(".")[1]}
              </span>
              <span className="text-gray-500 text-sm">/ pax</span>
            </p>
            <Link href={`/join/${game.game_id}`}>
              <a className="bg-primary-600 hover:bg-primary-700 text-white rounded-full px-3 py-1 font-medium tracking-tight">
                Book <ArrowRight size="16" strokeWidth="3" />
              </a>
            </Link>
          </div>
          {game.ribbon_img.length > 0 && (
            <img
              src={game.ribbon_img}
              className="absolute top-0 right-0 h-24 w-24 -mt-1 -mr-1"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GameItem;

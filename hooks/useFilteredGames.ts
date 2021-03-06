import Axios from "axios";
import { useCallback, useEffect, useState } from "react";

export type Game = {
  game_details: string;
  date: string;
  date_format: string;
  start_time: string;
  game_id: string;
  status: string;
  final_price: string;
  player_count: string;
  match_status: string;
  game_img: string;
  status_for_mobile: "Pending" | "Finalizing" | "Confirmed" | "Full & Confirmed";
  ribbon_img: string;
  game_type_img: string;
};

type GamesAPIResponse = APIResponse & {
  data: Game[];
  dynamic_filters: DynamicFilters;
};

type APIResponse = {
  status: boolean;
  message: string;
};

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type PreferredTime = "Morning" | "Afternoon" | "Night";

export type GameDuration = "1.0" | "2.0";

export type Filters = {
  daysOfWeek?: DayOfWeek[];
  preferredTimes?: PreferredTime[];
  categories?: { label: string; value: string }[];
  gameDurations?: { label: string; value: GameDuration }[];
};

export type DynamicFilters = {
  game_type?: { label: string; value: string }[];
};

type Status = "idle" | "fetching" | "refreshing";

const useFilteredGames = (): {
  games: Game[];
  status: Status;
  filters: Filters;
  dynamicFilters: DynamicFilters;
  updateFilters: (key: string, value: any) => void;
  reset: () => void;
} => {
  const [dynamicFilters, setDynamicFilters] = useState<DynamicFilters>({});
  const [filters, setFilters] = useState<Filters>({});
  const [games, setGames] = useState<Game[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const fetchGames = useCallback(async () => {
    setStatus("fetching");
    const params = {
      days: filters.daysOfWeek,
      preferred_time: filters.preferredTimes,
      game_type: filters.categories?.map(category => category.value),
      game_duration: filters.gameDurations?.map(duration => duration.value)
    }
    try {
      const { data: responseBody } = await Axios.get<GamesAPIResponse>("/api/games", {
        params,
      });
      if (!responseBody.status) {
        throw new Error(responseBody.message);
      }
      setGames(responseBody.data);
      setDynamicFilters(responseBody.dynamic_filters || {});
    } catch (error) {
      console.log(error);
    }
    setStatus("idle");
  }, [filters]);

  const handleUpdateFilters = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleReset = () => {
    setFilters({});
  };

  useEffect(() => {
    fetchGames();
  }, [fetchGames, filters]);

  return {
    games,
    status,
    filters,
    dynamicFilters,
    updateFilters: handleUpdateFilters,
    reset: handleReset,
  };
};

export default useFilteredGames;

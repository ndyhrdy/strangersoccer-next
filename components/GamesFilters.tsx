import { FC } from "react";
import {
  DayOfWeek,
  Filters,
  GameDuration,
  PreferredTime,
} from "../hooks/useFilteredGames";

type Props = {
  filters: Filters;
  onChange: (key: string, value: any) => void;
};

const daysOfWeek: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const preferredTimes: PreferredTime[] = ["Morning", "Afternoon", "Night"];

const gameDurations: { label: string; value: GameDuration }[] = [
  { label: "1 hour", value: "1.0" },
  { label: "2 hours", value: "2.0" },
];

const GamesFilters: FC<Props> = ({ filters, onChange }) => {
  return (
    <div className="shadow bg-white rounded">
      <div className="border-b px-4 py-4">
        <h4 className="font-medium text-gray-500 text-xs uppercase tracking-wider">
          Search Filters
        </h4>
      </div>
      <ul className="py-4">
        <li className="px-4 mb-4">
          <h5 className="font-light text-gray-600 text-xs uppercase tracking-wider mb-2">
            Day of Week
          </h5>
          <ul className="flex flex-wrap">
            {daysOfWeek.map((dayOfWeek) => {
              const selected = filters.daysOfWeek?.includes(dayOfWeek);
              return (
                <li key={dayOfWeek} className="mr-2">
                  <button
                    className={`block w-full ${
                      selected
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                    } text-sm rounded mb-2 px-4 py-2`}
                    onClick={() => {
                      onChange(
                        "daysOfWeek",
                        selected
                          ? filters.daysOfWeek.filter(
                              (selectedDayOfWeek) =>
                                selectedDayOfWeek !== dayOfWeek
                            )
                          : [...(filters.daysOfWeek || []), dayOfWeek]
                      );
                    }}
                  >
                    {dayOfWeek}
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
        <li className="px-4 mb-4">
          <h5 className="font-light text-gray-600 text-xs uppercase tracking-wider mb-2">
            Preferred Time
          </h5>
          <ul className="flex flex-wrap">
            {preferredTimes.map((preferredTime) => {
              const selected = filters.preferredTimes?.includes(preferredTime);
              return (
                <li key={preferredTime} className="mr-2">
                  <button
                    className={`block w-full ${
                      selected
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                    } text-sm rounded mb-2 px-4 py-2`}
                    onClick={() => {
                      onChange(
                        "preferredTimes",
                        selected
                          ? filters.preferredTimes.filter(
                              (selectedPreferredTime) =>
                                selectedPreferredTime !== preferredTime
                            )
                          : [...(filters.preferredTimes || []), preferredTime]
                      );
                    }}
                  >
                    {preferredTime}
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
        <li className="px-4 mb-4">
          <h5 className="font-light text-gray-600 text-xs uppercase tracking-wider mb-2">
            Game Duration
          </h5>
          <ul className="flex flex-wrap">
            {gameDurations.map((gameDuration) => {
              const selected = filters.gameDurations
                ?.map((selectedGameDuration) => selectedGameDuration.value)
                .includes(gameDuration.value);
              return (
                <li key={gameDuration.value} className="mr-2">
                  <button
                    className={`block w-full ${
                      selected
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                    } text-sm rounded mb-2 px-4 py-2`}
                    onClick={() => {
                      onChange(
                        "gameDurations",
                        selected
                          ? filters.gameDurations.filter(
                              (selectedGameDuration) =>
                                selectedGameDuration.value !==
                                gameDuration.value
                            )
                          : [...(filters.gameDurations || []), gameDuration]
                      );
                    }}
                  >
                    {gameDuration.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default GamesFilters;

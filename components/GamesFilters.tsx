import { FC } from "react";
import { DayOfWeek, Filters } from "../hooks/useFilteredGames";

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

const GamesFilters: FC<Props> = ({ filters, onChange }) => {
  return (
    <div className="shadow bg-white rounded">
      <div className="border-b px-4 py-2">
        <h4 className="font-medium text-gray-600 text-xs uppercase tracking-wider">
          Search Filters
        </h4>
      </div>
      <ul>
        <li className="px-4 py-4">
          <h5 className="font-light text-gray-600 text-xs uppercase tracking-wider mb-2">
            Day of Week
          </h5>
          <ul className="flex flex-wrap -mx-1">
            {daysOfWeek.map((dayOfWeek) => {
              const selected = filters.dayOfWeek?.includes(dayOfWeek);
              return (
                <li key={dayOfWeek} className="w-1/2 px-1">
                  <button
                    className={`block w-full ${
                      selected
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                    } text-sm rounded mb-2 px-4 py-2`}
                    onClick={() => {
                      onChange(
                        "dayOfWeek",
                        selected
                          ? filters.dayOfWeek.filter(
                              (selectedDayOfWeek) =>
                                selectedDayOfWeek !== dayOfWeek
                            )
                          : [...(filters.dayOfWeek || []), dayOfWeek]
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
      </ul>
    </div>
  );
};

export default GamesFilters;

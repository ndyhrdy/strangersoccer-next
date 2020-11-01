import { ChevronDown, ChevronUp } from "@styled-icons/feather";
import { FC, useState } from "react";
import {
  DayOfWeek,
  DynamicFilters,
  Filters,
  GameDuration,
  PreferredTime,
} from "../hooks/useFilteredGames";

type GamesFiltersProps = {
  filters: Filters;
  dynamicFilters?: DynamicFilters;
  onChange: (key: string, value: any) => void;
  onReset: () => void;
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

const GamesFilters: FC<GamesFiltersProps> = ({
  dynamicFilters,
  filters,
  onChange,
  onReset,
}) => {
  const dirty =
    Object.entries(filters).findIndex(
      ([filter, value]) => !!value && value.length > 0
    ) > -1;

  return (
    <div className="flex-1 shadow bg-white rounded">
      <div className="border-b px-4 h-12 flex items-center justify-between">
        <h4 className="font-medium text-gray-500 text-xs uppercase tracking-wider">
          Search Filters
        </h4>
        {dirty && (
          <button
            className="text-white bg-gray-500 hover:bg-gray-600 rounded-full px-3 py-1 text-sm"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <GamesFiltersSection
          count={filters.daysOfWeek?.length}
          initialExpanded={true}
          title="Day of Week"
        >
          <ul className="flex flex-wrap px-4">
            {daysOfWeek.map((dayOfWeek) => {
              const selected = filters.daysOfWeek?.includes(dayOfWeek);
              return (
                <li key={dayOfWeek} className="mr-2">
                  <button
                    className={`block w-full ${
                      selected
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                    } text-sm rounded mb-2 px-2 py-1`}
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
        </GamesFiltersSection>
        {!!dynamicFilters?.game_type && dynamicFilters.game_type.length > 0 && (
          <GamesFiltersSection
            count={filters.categories?.length}
            initialExpanded={true}
            title="Category"
          >
            <ul className="flex flex-wrap px-4">
              {dynamicFilters.game_type.map((category) => {
                const selected = filters.categories
                  ?.map((selectedCategory) => selectedCategory.value)
                  .includes(category.value);
                return (
                  <li key={category.value} className="mr-2">
                    <button
                      className={`block w-full ${
                        selected
                          ? "bg-primary-600 hover:bg-primary-700 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                      } text-sm rounded mb-2 px-2 py-1`}
                      onClick={() => {
                        onChange(
                          "categories",
                          selected
                            ? filters.categories.filter(
                                (selectedCategory) =>
                                  selectedCategory.value !== category.value
                              )
                            : [...(filters.categories || []), category]
                        );
                      }}
                    >
                      {category.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </GamesFiltersSection>
        )}
        <GamesFiltersSection
          count={filters.preferredTimes?.length}
          title="Preferred Time"
        >
          <ul className="flex flex-wrap px-4">
            {preferredTimes.map((preferredTime) => {
              const selected = filters.preferredTimes?.includes(preferredTime);
              return (
                <li key={preferredTime} className="mr-2">
                  <button
                    className={`block w-full ${
                      selected
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                    } text-sm rounded mb-2 px-2 py-1`}
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
        </GamesFiltersSection>
        <GamesFiltersSection
          count={filters.gameDurations?.length}
          title="Game Duration"
        >
          <ul className="flex flex-wrap px-4">
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
                    } text-sm rounded mb-2 px-2 py-1`}
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
        </GamesFiltersSection>
      </ul>
    </div>
  );
};

type GamesFiltersSectionProps = {
  count?: number;
  initialExpanded?: boolean;
  title: string;
};

const GamesFiltersSection: FC<GamesFiltersSectionProps> = ({
  children,
  count,
  initialExpanded,
  title,
}) => {
  const [expanded, setExpanded] = useState(initialExpanded || false);

  return (
    <li className="border-b">
      <button
        className={`w-full flex items-center justify-between font-light text-gray-600 text-xs uppercase tracking-wider py-3 px-4 ${
          expanded ? "" : "hover:bg-gray-100"
        }`}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <span>
          {title}{" "}
          {count > 0 && (
            <span className="bg-primary-600 text-white rounded-full px-1">
              {count}
            </span>
          )}
        </span>
        {expanded ? (
          <ChevronUp size="16" strokeWidth="2" />
        ) : (
          <ChevronDown size="16" strokeWidth="2" />
        )}
      </button>
      {expanded && <div className="pb-3">{children}</div>}
    </li>
  );
};

export default GamesFilters;

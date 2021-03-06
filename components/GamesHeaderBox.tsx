import { FC } from "react";
import { X } from "@styled-icons/feather";
import { Filters } from "../hooks/useFilteredGames";

type Props = {
  filters: Filters;
  onChangeFilters: (key: string, value: any) => void;
  onResetFilters: () => void;
};

const GamesHeaderBox: FC<Props> = ({
  filters,
  onChangeFilters,
  onResetFilters,
}) => {
  const visible =
    Object.entries(filters).findIndex(
      ([filter, value]) => !!value && value.length > 0
    ) > -1;

  if (!visible) {
    return null;
  }

  return (
    <div className="shadow bg-white py-4 px-4 mb-4 rounded md:hidden">
      {(filters.daysOfWeek || []).map((dayOfWeek) => {
        return (
          <FilterItem
            key={dayOfWeek}
            label={dayOfWeek}
            onRemove={() => {
              onChangeFilters(
                "daysOfWeek",
                filters.daysOfWeek.filter(
                  (selectedDayOfWeek) => selectedDayOfWeek !== dayOfWeek
                )
              );
            }}
          />
        );
      })}
      {(filters.categories || []).map((category) => {
        return (
          <FilterItem
            key={category.value}
            label={category.label}
            onRemove={() => {
              onChangeFilters(
                "categories",
                filters.categories.filter(
                  (selectedCategory) =>
                    selectedCategory.value !== category.value
                )
              );
            }}
          />
        );
      })}
      {(filters.preferredTimes || []).map((preferredTime) => {
        return (
          <FilterItem
            key={preferredTime}
            label={preferredTime}
            onRemove={() => {
              onChangeFilters(
                "preferredTimes",
                filters.preferredTimes.filter(
                  (selectedPreferredTime) =>
                    selectedPreferredTime !== preferredTime
                )
              );
            }}
          />
        );
      })}
      {(filters.gameDurations || []).map((gameDuration) => {
        return (
          <FilterItem
            key={gameDuration.value}
            label={gameDuration.label}
            onRemove={() => {
              onChangeFilters(
                "gameDurations",
                filters.gameDurations.filter(
                  (selectedGameDuration) =>
                    selectedGameDuration.value !== gameDuration.value
                )
              );
            }}
          />
        );
      })}

      <button
        className="inline-block mr-1 mb-1 py-2 px-3 text-sm text-primary-600 font-medium"
        onClick={onResetFilters}
      >
        Clear all
      </button>
    </div>
  );
};

type FilterItemProps = {
  label: string;
  onRemove: () => void;
};

const FilterItem: FC<FilterItemProps> = ({ label, onRemove }) => {
  return (
    <div className="inline-block mr-1 mb-1 py-2 px-3 rounded-full text-sm text-gray-700 font-medium bg-gray-200 hover:bg-gray-300">
      {`${label} `}
      <button onClick={onRemove}>
        <X size="16" strokeWidth="2" />
      </button>
    </div>
  );
};

export default GamesHeaderBox;

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
    <div className="shadow bg-white py-4 px-4 mb-4 rounded">
      {(filters.dayOfWeek || []).map((dayOfWeek) => {
        return (
          <div
            key={dayOfWeek}
            className="inline-block mr-1 mb-1 py-2 px-3 rounded-full text-sm text-gray-700 font-medium bg-gray-200 hover:bg-gray-300"
          >
            {dayOfWeek}{" "}
            <button
              onClick={() => {
                onChangeFilters(
                  "dayOfWeek",
                  filters.dayOfWeek.filter(
                    (selectedDayOfWeek) => selectedDayOfWeek !== dayOfWeek
                  )
                );
              }}
            >
              <X size="16" strokeWidth="2" />
            </button>
          </div>
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

export default GamesHeaderBox;

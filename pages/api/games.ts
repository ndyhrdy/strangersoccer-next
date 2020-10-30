import fs from "fs";
import moment from "moment";

export default (req, res) => {
  const games = JSON.parse(fs.readFileSync('data/games.json', { encoding: "utf-8" }));
  const filteredGames = filterGames(games, req.query);

  res.statusCode = 200;
  res.json({
    status: true,
    message: 'Game Listing',
    data: filteredGames,
    dynamic_filters: {
      game_type: [
        { value: "14", label: "5+1 Practice Game" },
        { value: "0", label: "Standard" },
        { value: "7", label: "Chill" },
        { value: "3", label: "Advanced" },
        { value: "1", label: "Veteran" },
        { value: "4", label: "Ladies" },
        { value: "9", label: "Social 11" },
        { value: "11", label: "Mixed Gender" },
        { value: "12", label: "Junior" },
        { value: "2", label: "Beginner" }
      ]
    }
  });
};

const filterGames = (games, filters) => {
  let filteredGames = [...games];
  if (filters['days[]']) {
    filteredGames = filteredGames.filter(game => {
      if (typeof filters['days[]'] === 'string') {
        return filters['days[]'] === moment(game.date_format, 'YYYY-MM-DD').format('dddd');
      }
      return filters['days[]'].includes(moment(game.date_format, 'YYYY-MM-DD').format('dddd'));
    })
  }
  if (filters['preferred_time[]']) {
    filteredGames = filteredGames.filter(game => {
      const gameStartTime = moment(game.start_time, 'HH:mm:ss');
      const filterByTime = (time) => {
        switch (time) {
          case "Morning":
            return gameStartTime.isSameOrAfter(moment("06:00:00", "HH:mm:ss")) && gameStartTime.isBefore(moment("12:00:00", "HH:mm:ss"));
          case "Afternoon":
            return gameStartTime.isSameOrAfter(moment("12:00:00", "HH:mm:ss")) && gameStartTime.isBefore(moment("18:00:00", "HH:mm:ss"));
          case "Night":
            return gameStartTime.isSameOrAfter(moment("18:00:00", "HH:mm:ss")) && gameStartTime.isSameOrBefore(moment("23:59:59", "HH:mm:ss")) || 
              gameStartTime.isSameOrAfter(moment("00:00:00", "HH:mm:ss")) && gameStartTime.isBefore(moment("06:00:00", "HH:mm:ss"));
        }
        return false;
      }
      if (typeof filters['preferred_time[]'] === 'string') {
        return filterByTime(filters['preferred_time[]']);
      }
      return filters['preferred_time[]'].filter(filterByTime).length > 0;
    })
  }
  if (filters['game_type[]']) {
    filteredGames = filteredGames.filter(game => {
      if (typeof filters['game_type[]'] === 'string') {
        return filters['game_type[]'] === game.game_type;
      }
      return filters['game_type[]'].includes(game.game_type);
    })
  }
  
  return filteredGames;
}
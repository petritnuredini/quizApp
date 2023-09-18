import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import PlayerItem from "./PlayerItem";

const TeamPlayers = () => {
  const { id } = useParams();
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState();
  const [addPlayerMode, setAddPlayerMode] = useState();
  const [playerName, setPlayerName] = useState("");
  const [playerSurname, setPlayerSurname] = useState("");
  const [error, setError] = useState("");

  const getTeamAndPlayers = () => {
    createAPIEndpoint("teams/" + id)
      .fetch()
      .then((res) => {
        setTeamName(res.data.teamName);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 404) {
          setError("No team with this id");
        } else {
          setError(err);
        }
      });

    createAPIEndpoint("teams/" + id + "/players")
      .fetch()
      .then((res) => {
        setPlayers(res.data);
        console.log("123", res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 404) {
          setError("No team with this id");
        } else {
          setError(err);
        }
      });
  };

  useEffect(() => {
    getTeamAndPlayers();
  }, []);

  const addPlayer = (e) => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.players)
      .post({
        playerName: playerName,
        playerSurname: playerSurname,
        teamId: id,
      })
      .then((res) => {
        if (res.status === 200) {
          getTeamAndPlayers();
          setAddPlayerMode(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPlayer = (playerId, playerName, playerSurname) => {
    createAPIEndpoint(ENDPOINTS.players)
      .put(playerId, {
        playerId: playerId,
        playerName: playerName,
        playerSurname: playerSurname,
        teamId: id,
      })
      .then((res) => {
        getTeamAndPlayers();
        console.log("Edit Player Response", res);
      })
      .catch((error) => console.log("Error", error))
      .finally(() => {
        setAddPlayerMode(false);
      });
  };

  const deletePlayer = (playerId) => {
    createAPIEndpoint(ENDPOINTS.players)
      .delete(playerId)
      .then((res) => {
        getTeamAndPlayers();
        console.log("Delete player response", res);
      })
      .catch((error) => console.log("Error", error))
      .finally(() => {
        setAddPlayerMode(false);
      });
  };

  return (
    <div className="team_players_screen">
      {error.length > 0 ? <h1>{error}</h1> : <h1>Players of {teamName}</h1>}
      {addPlayerMode ? (
        <form className="add_crud" onSubmit={addPlayer}>
          <div className="input_wrapper">
            <label htmlFor="playername">Player name</label>
            <input
              id="playername"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
          <div className="input_wrapper">
            <label htmlFor="playersurname">Player Surname</label>
            <input
              id="playersurname"
              value={playerSurname}
              onChange={(e) => setPlayerSurname(e.target.value)}
            />
          </div>
          <button className="crud_button">Add</button>
        </form>
      ) : (
        <button onClick={() => setAddPlayerMode(true)} className="crud_button">
          Add a Player
        </button>
      )}
      {players !== undefined && players.length > 0
        ? players.map((player) => (
            <PlayerItem
              key={player.playerId}
              player={player}
              onDelete={deletePlayer}
              onUpdate={editPlayer}
            />
          ))
        : null}
    </div>
  );
};

export default TeamPlayers;

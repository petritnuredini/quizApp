import React, { useEffect, useState } from "react";
import "../style/player-style.css";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import PlayerItem from "./PlayerItem";

const AllPlayers = () => {
  const [players, setPlayers] = useState();
  const [teams, setTeams] = useState();
  const [addPlayerMode, setAddPlayerMode] = useState(false);
  const [playerNameToAdd, setPlayerNameToAdd] = useState("");
  const [playerSurnameNameToAdd, setPlayerSurnameNameToAdd] = useState("");
  const [selectValue, setSelectValue] = useState();

  useEffect(() => {
    getPlayers();
    getTeams();
  }, []);

  const getTeams = () => {
    createAPIEndpoint(ENDPOINTS.teams)
      .fetch()
      .then((res) => {
        console.log("RES getting teams>>", res);
        setTeams(res.data);
        setSelectValue(res.data[0].teamId);
      })
      .catch((err) => {});
  };

  const getPlayers = () => {
    createAPIEndpoint(ENDPOINTS.players)
      .fetch()
      .then((res) => {
        console.log("resss", res);
        setPlayers(res.data);
      })
      .catch((err) => {});
  };

  const deletePlayer = (id) => {
    createAPIEndpoint(ENDPOINTS.players)
      .delete(id)
      .then((res) => {
        console.log("RESPONSE OF DELETING PLAYER");
        getPlayers();
      })
      .catch((err) => {
        console.log("ERRORRR", err);
      });
  };

  const editPlayer = (playerId, playerName, playerSurname, id) => {
    console.log("iddd>>", id);
    createAPIEndpoint(ENDPOINTS.players)
      .put(playerId, {
        playerId: playerId,
        playerName: playerName,
        playerSurname: playerSurname,
        teamId: id,
      })
      .then((res) => {
        getPlayers();
        console.log("Edit Player Response", res);
      })
      .catch((error) => console.log("Error at All Clients", error))
      .finally(() => {
        setAddPlayerMode(false);
      });
  };

  const addPlayer = (e) => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.players)
      .post({
        playerName: playerNameToAdd,
        playerSurname: playerSurnameNameToAdd,
        teamId: selectValue,
      })
      .then((res) => {
        if (res.status === 200) {
          setPlayerNameToAdd("");
          setPlayerSurnameNameToAdd("");
          getPlayers();
          setAddPlayerMode(false);
        }
      })
      .catch((err) => {
        console.log("error adding", err);
      });
  };

  const onOptionChangeHandler = (e) => {
    setSelectValue(parseInt(e.target.value));
  };

  return (
    <div className="player_screen_container">
      <h1 className="players_screen_title">All Clients</h1>
      {addPlayerMode ? (
        <form className="add_crud" onSubmit={addPlayer}>
          <input
            value={playerNameToAdd}
            onChange={(e) => setPlayerNameToAdd(e.target.value)}
            placeholder="Add a Client name"
          />
          <input
            value={playerSurnameNameToAdd}
            onChange={(e) => setPlayerSurnameNameToAdd(e.target.value)}
            placeholder="Add a Client surname"
          />
          {teams !== undefined && teams.length > 0 ? (
            <select onChange={onOptionChangeHandler}>
              {teams.map((team, index) => (
                <option key={index} value={team.teamId}>
                  {team.teamName}
                </option>
              ))}
            </select>
          ) : null}
          <button className="crud_button">Add</button>
        </form>
      ) : (
        <button onClick={() => setAddPlayerMode(true)} className="crud_button">
          Add a Client
        </button>
      )}
      {players !== undefined && players.length > 0
        ? players.map((player) => (
            <PlayerItem
              key={player.playerId}
              player={player}
              onDelete={deletePlayer}
              onUpdate={editPlayer}
              team={player.team}
              teams={teams}
            />
          ))
        : null}
    </div>
  );
};

export default AllPlayers;

import React, { useEffect, useState } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import PlayerItem from "./PlayerItem";

const AllPlayers = () => {
  const [players, setPlayers] = useState();
  const [teams, setTeams] = useState();
  const [addPlayerMode, setAddPlayerMode] = useState(false);
  const [playerNameToAdd, setPlayerNameToAdd] = useState("");
  const [playerNumber, setPlayerNumber] = useState();
  const [playerBirthYear, setPlayerBirthYear] = useState("");
  const [selectValue, setSelectValue] = useState();
  const [error, setError] = useState("");

  console.log("playerBirthYear", playerBirthYear);
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
        setError("");
      })
      .catch((err) => {
        setError("An error accoured contacting backend!");
      });
  };

  const getPlayers = () => {
    createAPIEndpoint(ENDPOINTS.players)
      .fetch()
      .then((res) => {
        console.log("resss", res);
        setPlayers(res.data);
        setError("");
      })
      .catch((err) => {
        setError("An error accoured contacting backend!");
      });
  };

  const deletePlayer = (id) => {
    createAPIEndpoint(ENDPOINTS.players)
      .delete(id)
      .then((res) => {
        console.log("RESPONSE OF DELETING PLAYER");
        getPlayers();
        setError("");
      })
      .catch((err) => {
        console.log("ERRORRR", err);
        setError("An error accoured contacting backend!");
      });
  };

  const editPlayer = (playerId, playerName, number, birthYear, id) => {
    if (playerName.length > 0 && number.length > 0) {
      console.log(
        "playerBirthYear",

        playerBirthYear
      );

      createAPIEndpoint(ENDPOINTS.players)
        .put(playerId, {
          playerName: playerName,
          number: number,
          playerId: playerId,
          birthYear: birthYear,
          teamId: id,
        })
        .then((res) => {
          getPlayers();
          console.log("Edit Player Response", res);
          setError("");
        })
        .catch((error) => console.log("Error at all players", error))
        .finally(() => {
          setAddPlayerMode(false);
        });
    } else {
      setError("Please enter a valid name and surname!");
    }
  };

  const addPlayer = (e) => {
    e.preventDefault();

    if (teams.length === 0) {
      setError("You must add a team first, and then you can add a player!");
    }
    if (playerNameToAdd.length > 0 && playerNumber.length > 0) {
      console.log("playerNumber", playerNumber);
      createAPIEndpoint(ENDPOINTS.players)
        .post({
          playerName: playerNameToAdd,
          number: parseInt(playerNumber),
          birthYear: playerBirthYear,
          teamId: selectValue,
        })
        .then((res) => {
          if (res.status === 200) {
            setPlayerNameToAdd("");
            setPlayerNumber("");
            getPlayers();
            setAddPlayerMode(false);
            setError("");
          }
        })
        .catch((err) => {
          console.log("error adding", err);
          setError("An error accoured contacting backend!");
        });
    } else {
      setError("Please enter a valid name and surname!");
    }
  };

  const onOptionChangeHandler = (e) => {
    setSelectValue(parseInt(e.target.value));
  };

  return (
    <div className="player_screen_container">
      <h1 className="players_screen_title">All Players</h1>
      {error.length > 0 && <p className="error_message">{error}</p>}
      {addPlayerMode ? (
        <form className="add_crud" onSubmit={addPlayer}>
          <input
            value={playerNameToAdd}
            onChange={(e) => setPlayerNameToAdd(e.target.value)}
            placeholder="Add a player name"
          />
          <input
            value={playerNumber}
            onChange={(e) => setPlayerNumber(e.target.value)}
            placeholder="Add a player number"
          />
          <input
            value={playerBirthYear}
            onChange={(e) => setPlayerBirthYear(e.target.value)}
            placeholder="Add a player birth year"
          />
          123
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
          Add a Player
        </button>
      )}
      {players !== undefined && players.length > 0 ? (
        players.map((player) => (
          <PlayerItem
            key={player.playerId}
            player={player}
            onDelete={deletePlayer}
            onUpdate={editPlayer}
            team={player.team}
            teams={teams}
          />
        ))
      ) : (
        <p className="no_data_on_system">...Opps, no players found!</p>
      )}
    </div>
  );
};

export default AllPlayers;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import PlayerItem from "./PlayerItem";

const TeamPlayers = () => {
  const { id } = useParams();
  const [teams, setTeams] = useState();

  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState();
  const [addPlayerMode, setAddPlayerMode] = useState();
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [playerBirthYear, setPlayerBirthYear] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getTeamAndPlayers = () => {
    createAPIEndpoint(ENDPOINTS.teams)
      .fetch()
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => {});

    createAPIEndpoint("teams/" + id)
      .fetch()
      .then((res) => {
        setTeamName(res.data.teamName);
        setErrorMessage("");
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 404) {
          setError("No team with this id");
        } else {
          setError(err);
          setErrorMessage("An error accoured contacting backend!");
        }
      });

    createAPIEndpoint("teams/" + id + "/players")
      .fetch()
      .then((res) => {
        setPlayers(res.data);
        setErrorMessage("");
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 404) {
          setError("No team with this id");
        } else {
          setError(err);
          setErrorMessage("An error accoured contacting backend!");
        }
      });
  };

  useEffect(() => {
    getTeamAndPlayers();
  }, []);

  const addPlayer = (e) => {
    e.preventDefault();
    if (playerName.length > 0 && playerNumber.length > 0) {
      createAPIEndpoint(ENDPOINTS.players)
        .post({
          playerName: playerName,
          number: playerNumber,
          birthYear: playerBirthYear,
          teamId: id,
        })
        .then((res) => {
          if (res.status === 200) {
            getTeamAndPlayers();
            setAddPlayerMode(false);
            setErrorMessage("");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("An error accoured contacting backend!");
        });
    } else {
      setErrorMessage("Please enter a valid name and surname!");
    }
  };

  const editPlayer = (playerId, playerName, playerNumber, id) => {
    createAPIEndpoint(ENDPOINTS.players)
      .put(playerId, {
        playerId: playerId,
        playerName: playerName,
        number: playerNumber,
        teamId: id,
      })
      .then((res) => {
        getTeamAndPlayers();
        console.log("Edit Player Response", res);
      })
      .catch((error) => console.log("Error at team players", error))
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
      {errorMessage.length > 0 && (
        <p className="error_message">{errorMessage}</p>
      )}
      {addPlayerMode ? (
        <form className="add_crud" onSubmit={addPlayer}>
          <div className="input_wrapper">
            <label htmlFor="playername">Player name</label>
            <input
              id="playername"
              placeholder="Player Name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
          <div className="input_wrapper">
            <label htmlFor="playerNumber">Player Birthyear</label>
            <input
              id="playerNumber"
              placeholder="Player number"
              value={playerNumber}
              onChange={(e) => setPlayerNumber(e.target.value)}
            />
          </div>
          <div className="input_wrapper">
            <label htmlFor="playerBirthYear">Player Birthyear</label>
            <input
              id="playerBirthYear"
              placeholder="Player Birthyear"
              value={playerBirthYear}
              onChange={(e) => setPlayerBirthYear(e.target.value)}
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
              teams={teams}
            />
          ))
        : null}
    </div>
  );
};

export default TeamPlayers;

import React, { useEffect, useState } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import PlayerItem from "./PlayerItem";

const AllPlayers = () => {
  const [players, setPlayers] = useState();
  const [teams, setTeams] = useState();
  const [addPlayerMode, setAddPlayerMode] = useState(false);
  const [playerNameToAdd, setPlayerNameToAdd] = useState("");
  const [playerSurnameNameToAdd, setPlayerSurnameNameToAdd] = useState("");
  const [selectValue, setSelectValue] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    getPlayers();
    getTeams();
  }, []);

  const getTeams = () => {
    createAPIEndpoint(ENDPOINTS.teams)
      .fetch()
      .then((res) => {
        setTeams(res.data);
        if (res.data.length > 0) {
          setSelectValue(res.data[0].teamId);
        }
        setError("");
      })
      .catch((err) => {
        console.log("Error", err);
        setError("An error accoured contacting backend!");
      });
  };

  const getPlayers = () => {
    createAPIEndpoint(ENDPOINTS.players)
      .fetch()
      .then((res) => {
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

  const editPlayer = (playerId, playerName, playerSurname, id) => {
    if (playerName.length > 0 && playerSurname.length > 0) {
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
          setError("");
        })
        .catch((error) => {
          console.log("Error at All Clients", error);
          setError("An error accoured contacting backend!");
        })
        .finally(() => {
          setAddPlayerMode(false);
        });
    } else {
      setError("Please enter a valid name and surname!");
    }
  };

  const addPlayer = (e) => {
    e.preventDefault();
    if (playerNameToAdd.length > 0 && playerSurnameNameToAdd.length > 0) {
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
            setError("");
            setSelectValue();
            setSelectValue(teams[0].teamId);
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
      <h1 className="players_screen_title">All Clients</h1>
      {error.length > 0 && <p className="error_message">{error}</p>}

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
            <select
              onChange={onOptionChangeHandler}
              defaultValue={teams[0].teamId}
            >
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
        <button
          onClick={() => {
            if (teams.length > 0) {
              setAddPlayerMode(true);
            } else {
              setError("You must add a bank first, then you can add clients!");
            }
          }}
          className="crud_button"
        >
          Add a Client
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
        <p className="no_data_on_system">...Opps, no clients found!</p>
      )}
    </div>
  );
};

export default AllPlayers;

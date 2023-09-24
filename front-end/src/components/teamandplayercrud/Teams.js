import React, { useEffect, useState } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import "../../style/team-style.css";
import TeamItem from "./TeamItem";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [addATeamMode, setAddATeamMode] = useState(false);
  const [teamToAdd, setTeamToAdd] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = () => {
    createAPIEndpoint(ENDPOINTS.teams)
      .fetch()
      .then((res) => {
        setTeams(res.data);
        setError("");
      })
      .catch((err) => {
        setError("An error accoured contacting backend!");
      });
  };

  const addTeam = (e) => {
    e.preventDefault();
    if (teamToAdd.length > 0) {
      createAPIEndpoint(ENDPOINTS.teams)
        .post({ teamName: teamToAdd })
        .then((res) => {
          if (res.status === 200) {
            setTeamToAdd("");
            getTeams();
            setAddATeamMode(false);
            setError("");
          }
        })
        .catch((err) => {
          console.log("error adding", err);
          setError("An error accoured contacting backend!");
        });
    } else {
      setError("Please enter a valid team name!");
    }
  };

  const editTeam = (id, newName) => {
    console.log("newNamenewName", newName.length);
    if (newName.length > 0) {
      createAPIEndpoint(ENDPOINTS.teams)
        .put(id, { teamName: newName })
        .then((res) => {
          getTeams();
          setError("");
        })
        .catch((error) => {
          console.log("Error", error);
          setError("An error accoured contacting backend!");
        })
        .finally(() => {
          setAddATeamMode(false);
        });
    } else {
      setError("Please enter a valid team name!");
    }
  };

  const deleteTeam = (id) => {
    createAPIEndpoint(ENDPOINTS.teams)
      .delete(id)
      .then((res) => {
        getTeams();
      })
      .catch((err) => {
        console.log("ERRORRR", err);
      });
  };

  return (
    <div className="teams_screen_container">
      <h1 className="teams_title">Teams</h1>
      {error.length > 0 && <p className="error_message">{error}</p>}
      {addATeamMode ? (
        <form className="add_crud" onSubmit={addTeam}>
          <input
            value={teamToAdd}
            onChange={(e) => setTeamToAdd(e.target.value)}
            placeholder="Add a team name"
          />
          <button className="crud_button">Add</button>
        </form>
      ) : (
        <button onClick={() => setAddATeamMode(true)} className="crud_button">
          Add a Team
        </button>
      )}
      {teams !== undefined && teams.length > 0 ? (
        teams.map((team) => (
          <TeamItem
            key={team.teamName}
            team={team}
            onDelete={deleteTeam}
            onUpdate={editTeam}
          />
        ))
      ) : (
        <p className="no_data_on_system">...Opps, no teams found!</p>
      )}
    </div>
  );
};

export default Teams;

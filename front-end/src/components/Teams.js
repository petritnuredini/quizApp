import React, { useEffect, useState } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import "../style/team-style.css";
import { DeleteIcon, EditIcon } from "../svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TeamItem from "./TeamItem";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [addATeamMode, setAddATeamMode] = useState(false);
  const [teamToAdd, setTeamToAdd] = useState("");

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = () => {
    createAPIEndpoint(ENDPOINTS.teams)
      .fetch()
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => {});
  };

  const addTeam = (e) => {
    e.preventDefault();
    createAPIEndpoint(ENDPOINTS.teams)
      .post({ teamName: teamToAdd })
      .then((res) => {
        if (res.status === 200) {
          setTeamToAdd("");
          getTeams();
          setAddATeamMode(false);
        }
      })
      .catch((err) => {
        console.log("error adding", err);
      });
  };

  const editTeam = (id, newName) => {
    createAPIEndpoint(ENDPOINTS.teams)
      .put(id, { teamName: newName })
      .then((res) => {
        getTeams();
      })
      .catch((error) => console.log("Error", error))
      .finally(() => {
        setAddATeamMode(false);
      });
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
        <p>no teams</p>
      )}
    </div>
  );
};

export default Teams;

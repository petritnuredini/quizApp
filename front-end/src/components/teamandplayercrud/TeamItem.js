import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../../svg";

const TeamItem = ({ team, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editInput, setEditInput] = useState(team.teamName);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(team.teamId, editInput);
    setEditMode(false);
  };

  return (
    <div className="crud_details" key={team.teamName}>
      {editMode ? (
        <form onSubmit={handleUpdate}>
          <input
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            placeholder="Add a team name"
          />
        </form>
      ) : (
        <p className="crud_name">{team.teamName}</p>
      )}
      <div className="edit_crud">
        {editMode ? (
          <button onClick={handleUpdate} className="crud_button">
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setEditInput(team.teamName);
              setEditMode(true);
            }}
            className="crud_button"
          >
            <EditIcon />
          </button>
        )}

        <button onClick={() => onDelete(team.teamId)} className="crud_button">
          <DeleteIcon />
        </button>

        <button
          onClick={() => {
            navigate("/team/" + team.teamId + "/players");
          }}
          className="crud_button"
        >
          See Players of this team
        </button>
      </div>
    </div>
  );
};

export default TeamItem;

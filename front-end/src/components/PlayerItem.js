import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../svg";

const PlayerItem = ({ player, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputOnevalue, setInputOnevalue] = useState(player.playerName);
  const [inputSecondValue, setInputSecondValue] = useState(
    player.playerSurname
  );

  const handleUpdate = () => {
    onUpdate(player.playerId, inputOnevalue, inputSecondValue);
    setEditMode(false);
  };

  return (
    <div className="crud_details" key={player.playerName}>
      {editMode ? (
        <div className="crud_details">
          <input
            value={inputOnevalue}
            onChange={(e) => setInputOnevalue(e.target.value)}
          />
          <input
            value={inputSecondValue}
            onChange={(e) => setInputSecondValue(e.target.value)}
          />
        </div>
      ) : (
        <div className="crud_inputs_wrapper">
          <p className="crud_name">{player.playerName}</p>
          <p className="crud_name">{player.playerSurname}</p>
        </div>
      )}
      <div className="edit_crud">
        {editMode ? (
          <button onClick={handleUpdate} className="crud_button">
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setInputOnevalue(player.playerName);
              setEditMode(true);
            }}
            className="crud_button"
          >
            <EditIcon />
          </button>
        )}

        <button
          onClick={() => onDelete(player.playerId)}
          className="crud_button"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default PlayerItem;

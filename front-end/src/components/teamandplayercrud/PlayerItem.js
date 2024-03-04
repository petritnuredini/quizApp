import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../../svg";
import { ENDPOINTS, createAPIEndpoint } from "../../api";

const PlayerItem = ({ player, onDelete, onUpdate, team, teams }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputOnevalue, setInputOnevalue] = useState(player.playerName);
  const [inputSecondValue, setInputSecondValue] = useState(player.name);
  const [inputThirdValue, setInputThirdValue] = useState(player.birthYear);

  const [selectValue, setSelectValue] = useState(
    player && player.team && player.team.teamId
  );

  const handleUpdate = () => {
    onUpdate(
      player.playerId,
      inputOnevalue,
      inputSecondValue,
      inputThirdValue,
      team !== undefined ? selectValue : player.teamId
    );
    setEditMode(false);
  };

  const onOptionChangeHandler = (e) => {
    setSelectValue(parseInt(e.target.value));
  };

  return (
    <div className="crud_details" key={player.playerName}>
      {editMode ? (
        <div className="crud_details">
          <input
            value={inputOnevalue}
            onChange={(e) => setInputOnevalue(e.target.value)}
            placeholder="Add a player name"
          />
          <input
            value={inputSecondValue}
            onChange={(e) => setInputSecondValue(e.target.value)}
            placeholder="Add a player number"
          />
          <input
            value={inputThirdValue}
            onChange={(e) => setInputThirdValue(e.target.value)}
            placeholder="Add a player birthyear"
          />
          {team !== undefined ? (
            <select onChange={onOptionChangeHandler}>
              <option value={selectValue}>{player.team.teamName}</option>
              {teams !== undefined &&
                teams.length > 0 &&
                teams
                  .filter((team) => team.teamName !== player.team.teamName)
                  .map((team, index) => (
                    <option key={index} value={team.teamId}>
                      {team.teamName}
                    </option>
                  ))}
            </select>
          ) : null}
        </div>
      ) : (
        <div className="crud_inputs_wrapper">
          <p className="crud_name">{player.playerName}</p>
          <p className="crud_name">{player.number}</p>
          <p className="crud_name">{player.birthYear}</p>
          {team !== undefined ? (
            <p className="crud_name">{team.teamName}</p>
          ) : null}
        </div>
      )}
      <div className="edit_crud">
        {editMode ? (
          <button onClick={handleUpdate} className="crud_button">
            Save322
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

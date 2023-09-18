import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '../svg';
import { ENDPOINTS, createAPIEndpoint } from '../api';

const PlayerItem = ({ player, onDelete, onUpdate, team }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputOnevalue, setInputOnevalue] = useState(player.playerName);
  const [inputSecondValue, setInputSecondValue] = useState(
    player.playerSurname
  );
  const [teams, setTeams] = useState();
  const [selectValue, setSelectValue] = useState();

  const handleUpdate = () => {
    onUpdate(
      player.playerId,
      inputOnevalue,
      inputSecondValue,
      team !== undefined ? selectValue : player.teamId
    );
    setEditMode(false);
  };

  const getTeams = () => {
    createAPIEndpoint(ENDPOINTS.teams)
      .fetch()
      .then((res) => {
        console.log('RES getting teams>>', res);
        setTeams(res.data);
      })
      .catch((err) => {});
  };

  const onOptionChangeHandler = (e) => {
    setSelectValue(parseInt(e.target.value));
  };

  useEffect(() => {
    if (team !== undefined) {
      getTeams();
    }
  }, [team]);

  console.log('teamm', selectValue);

  return (
    <div className='crud_details' key={player.playerName}>
      {editMode ? (
        <div className='crud_details'>
          <input
            value={inputOnevalue}
            onChange={(e) => setInputOnevalue(e.target.value)}
          />
          <input
            value={inputSecondValue}
            onChange={(e) => setInputSecondValue(e.target.value)}
          />
          {team !== undefined ? (
            <select onChange={onOptionChangeHandler}>
              {teams
                .filter((team) => team.teamName !== 'Select a team')
                .map((team, index) => (
                  <option key={index} value={team.teamId}>
                    {team.teamName}
                  </option>
                ))}
            </select>
          ) : null}
        </div>
      ) : (
        <div className='crud_inputs_wrapper'>
          <p className='crud_name'>{player.playerName}</p>
          <p className='crud_name'>{player.playerSurname}</p>
          {team !== undefined ? (
            <p className='crud_name'>{team.teamName}</p>
          ) : null}
        </div>
      )}
      <div className='edit_crud'>
        {editMode ? (
          <button onClick={handleUpdate} className='crud_button'>
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setInputOnevalue(player.playerName);
              setEditMode(true);
            }}
            className='crud_button'
          >
            <EditIcon />
          </button>
        )}

        <button
          onClick={() => onDelete(player.playerId)}
          className='crud_button'
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default PlayerItem;

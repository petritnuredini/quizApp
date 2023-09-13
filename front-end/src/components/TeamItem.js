import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '../svg';

const TeamItem = ({ team, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editInput, setEditInput] = useState(team.teamName);
  const navigate = useNavigate();

  const handleUpdate = () => {
    onUpdate(team.teamId, editInput);
    setEditMode(false);
  };

  return (
    <div className='crud_details' key={team.teamName}>
      {editMode ? (
        <input
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
        />
      ) : (
        <p className='crud_name'>{team.teamName}</p>
      )}
      <div className='edit_crud'>
        {editMode ? (
          <Button onClick={handleUpdate}>Save</Button>
        ) : (
          <Button
            onClick={() => {
              setEditInput(team.teamName);
              setEditMode(true);
            }}
          >
            <EditIcon />
          </Button>
        )}

        <Button onClick={() => onDelete(team.teamId)}>
          <DeleteIcon />
        </Button>

        <Button
          onClick={() => {
            navigate('/team/' + team.teamId + '/players');
          }}
        >
          See Players of this team
        </Button>
      </div>
    </div>
  );
};

export default TeamItem;

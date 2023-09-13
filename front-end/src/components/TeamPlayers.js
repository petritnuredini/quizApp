import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ENDPOINTS, createAPIEndpoint } from '../api';
import { Button } from '@mui/material';
import { DeleteIcon, EditIcon } from '../svg';

const TeamPlayers = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState();
  const [addPlayerMode, setAddPlayerMode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerSurname, setPlayerSurname] = useState('');
  const [error, setError] = useState('');

  const getTeams = () => {
    createAPIEndpoint('teams/' + id)
      .fetch()
      .then((res) => {
        setTeamName(res.data.teamName);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 404) {
          setError('No team with this id');
        } else {
          setError(err);
        }
      });

    createAPIEndpoint('teams/' + id + '/players')
      .fetch()
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 404) {
          setError('No team with this id');
        } else {
          setError(err);
        }
      });
  };

  useEffect(() => {
    getTeams();
  }, []);

  const addPlayer = () => {
    createAPIEndpoint(ENDPOINTS.players)
      .post({
        playerName: playerName,
        playerSurname: playerSurname,
        teamId: id,
      })
      .then((res) => {
        if (res.status === 200) {
          getTeams();
          setAddPlayerMode(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='team_players_screen'>
      {error.length > 0 ? <h1>{error}</h1> : <h1>Players of {teamName}</h1>}
      {addPlayerMode ? (
        <div className='add_crud'>
          <div className='input_wrapper'>
            <label htmlFor='playername'>Player name</label>
            <input
              id='playername'
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
          <div className='input_wrapper'>
            <label htmlFor='playersurname'>Player Surname</label>
            <input
              id='playersurname'
              value={playerSurname}
              onChange={(e) => setPlayerSurname(e.target.value)}
            />
          </div>
          <Button onClick={addPlayer}>Add</Button>
        </div>
      ) : (
        <Button onClick={() => setAddPlayerMode(true)}>Add a Player</Button>
      )}
      {players !== undefined && players.length > 0
        ? players.map((player) => (
            <div className='crud_details' key={player.playerName}>
              <ul>
                <li>
                  {player.playerName} {player.playerSurname}
                </li>
              </ul>
            </div>
          ))
        : null}
    </div>
  );
};

export default TeamPlayers;

import React, { useEffect, useState } from 'react';
import '../style/player-style.css';
import { ENDPOINTS, createAPIEndpoint } from '../api';
import PlayerItem from './PlayerItem';

const AllPlayers = () => {
  const [players, setPlayers] = useState();
  const [addPlayerMode, setAddPlayerMode] = useState(false);

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = () => {
    createAPIEndpoint(ENDPOINTS.players)
      .fetch()
      .then((res) => {
        console.log('resss', res);
        setPlayers(res.data);
      })
      .catch((err) => {});
  };

  const deletePlayer = (id) => {
    createAPIEndpoint(ENDPOINTS.players)
      .delete(id)
      .then((res) => {
        console.log('RESPONSE OF DELETING PLAYER');
        getPlayers();
      })
      .catch((err) => {
        console.log('ERRORRR', err);
      });
  };

  const editPlayer = (playerId, playerName, playerSurname, id) => {
    console.log('iddd>>', id);
    createAPIEndpoint(ENDPOINTS.players)
      .put(playerId, {
        playerId: playerId,
        playerName: playerName,
        playerSurname: playerSurname,
        teamId: id,
      })
      .then((res) => {
        getPlayers();
        console.log('Edit Player Response', res);
      })
      .catch((error) => console.log('Error at all players', error))
      .finally(() => {
        setAddPlayerMode(false);
      });
  };

  return (
    <div className='player_screen_container'>
      <h1 className='players_screen_title'>All Players</h1>
      {players !== undefined && players.length > 0
        ? players.map((player) => (
            <PlayerItem
              key={player.playerId}
              player={player}
              onDelete={deletePlayer}
              onUpdate={editPlayer}
              team={player.team}
            />
          ))
        : null}
    </div>
  );
};

export default AllPlayers;

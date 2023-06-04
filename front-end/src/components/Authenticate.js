import React from 'react';
import useStateContext from '../hooks/useStateContext';
import { Navigate, Outlet } from 'react-router-dom';

function Authenticate() {
  const { context, setContext } = useStateContext();
  return context.participantId === 0 ? <Navigate to='/' /> : <Outlet />;
}

export default Authenticate;

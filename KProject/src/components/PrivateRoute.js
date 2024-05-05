import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SecureRoute = (props) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Redirect to='/login'/>;
  }
  return props.children;
};

export default SecureRoute;

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = async (e) => {
    await dispatch(logout())
      // .then(history.push('/'))
  };

  return (
    <div className="sign flexRow alignCenter justCenter" onClick={onLogout}>
      Logout
    </div>
  );
};

export default LogoutButton;

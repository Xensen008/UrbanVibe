import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AuthPrompt from '../AuthPrompt';
import Authentication from '../../pages/Authentication';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [openAuth, setOpenAuth] = useState(false);

  if (!currentUser) {
    return (
      <>
        <AuthPrompt setOpenAuth={setOpenAuth} />
        <Authentication openAuth={openAuth} setOpenAuth={setOpenAuth} />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;

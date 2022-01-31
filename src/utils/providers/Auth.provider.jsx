import React, { useState, useEffect, useContext, useCallback } from 'react';

import { AUTH_STORAGE_KEY, USER_INFO } from '../constants';
import { storage } from '../storage';

const AuthContext = React.createContext(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`Can't use "useAuth" without an AuthProvider!`);
  }
  return context;
}

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const mockedUser = {
    id: '123',
    name: 'Wizeline',
    email: 'user@wizeline.com',
    avatarUrl: 'https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png',
  };

  useEffect(() => {
    const lastAuthState = storage.get(AUTH_STORAGE_KEY);
    const isAuthenticated = Boolean(lastAuthState);

    setAuthenticated(isAuthenticated);
  }, []);

  async function login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'user@wizeline.com' && password === '123123') {
          setUser(mockedUser);
          storage.set(AUTH_STORAGE_KEY, true);
          storage.set(USER_INFO, mockedUser);
          debugger;
          setAuthenticated(true);
          return resolve(mockedUser);
        }
        return reject(new Error('Email or password is not correct.'));
      }, 500);
    });
  }

  const logout = useCallback(() => {
    setAuthenticated(false);
    setUser(null);
    storage.set(AUTH_STORAGE_KEY, false);
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, authenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };
export default AuthProvider;

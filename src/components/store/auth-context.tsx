import React, { useState } from 'react';

type AuthContextObj = {
  token: any;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  sideContainerValue:boolean;
setsideContainer: (e:boolean) => void;
};

export const AuthContext = React.createContext<AuthContextObj>({
  token: '',
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
  sideContainerValue:false,
setsideContainer: (e:boolean) => {},
});

export const AuthContextProvider: React.FC = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [showValue, setshowValue] = useState(false);
  const userIsLoggedIn = !!token;
 
  const loginHandler = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };
  const setsideContainerHandler=(e:boolean)=>{
    setshowValue(e);
    }
 
  const contextValue: AuthContextObj = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    sideContainerValue:showValue,
    setsideContainer:setsideContainerHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

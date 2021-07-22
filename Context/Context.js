import React from "react";

const AuthContext = React.createContext({
  loggedIn: null,
  setLoggedIn: () => {},
  userDetails: null,
  setUserDetails: (userDetails) => {},
  setModalVisible: null,
});

export default AuthContext;

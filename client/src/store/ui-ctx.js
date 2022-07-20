import { createContext, useState } from "react";

export const uiCtx = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  showLogin: false,
  setShowLogin: () => {},
});

const UiCtxProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <uiCtx.Provider
      value={{ isLoggedIn, setIsLoggedIn, showLogin, setShowLogin }}
    >
      {props.children}
    </uiCtx.Provider>
  );
};

export default UiCtxProvider;

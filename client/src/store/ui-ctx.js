import { createContext, useState } from "react";

export const uiCtx = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  showLogin: false,
  setShowLogin: () => {},
  showModal: false,
  setShowModal: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

const UiCtxProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <uiCtx.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        showLogin,
        setShowLogin,
        showModal,
        setShowModal,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </uiCtx.Provider>
  );
};

export default UiCtxProvider;

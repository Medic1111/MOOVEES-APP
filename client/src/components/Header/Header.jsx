import classes from "./Header.module.css";
import { uiCtx } from "../../store/ui-ctx";
import { listsCtx } from "../../store/lists-ctx";
import { useContext } from "react";

const Header = () => {
  const uiCtxMgr = useContext(uiCtx);
  const listsCtxMgr = useContext(listsCtx);

  const logOutHandler = () => {
    uiCtxMgr.setShowLogin(false);
    uiCtxMgr.setIsLoggedIn(false);
    listsCtxMgr.setUser("");
    listsCtxMgr.setData([]);
    listsCtxMgr.setWatched([]);
    listsCtxMgr.setWish([]);
  };
  const logInHandler = () => {
    uiCtxMgr.setShowLogin(true);
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>Moovees</h1>
      <button
        onClick={uiCtxMgr.showLogin ? logOutHandler : logInHandler}
        className={classes.logOut}
      >
        {uiCtxMgr.isLoggedIn && "Log out"}
      </button>
    </header>
  );
};

export default Header;

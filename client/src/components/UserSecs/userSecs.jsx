import { listsCtx } from "../../store/lists-ctx";
import React, { useContext } from "react";
import WishList from "../../components/WishList/WishList";
import Watched from "../../components/Watched/Watched";
import List from "../../components/List/List";

const UserSecs = () => {
  const listCtxMgr = useContext(listsCtx);

  return (
    <React.Fragment>
      {listCtxMgr.data.length === 0 || <List />}
      {listCtxMgr.wish.length === 0 || <WishList />}
      {listCtxMgr.watched.length === 0 || <Watched />}
    </React.Fragment>
  );
};

export default UserSecs;

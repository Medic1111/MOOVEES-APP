import { listsCtx } from "../../store/lists-ctx";
import React, { useContext } from "react";
import Form from "../../components/Form/Form";
import List from "../../components/List/List";
import Wrapper from "../../components/Wrapper/Wrapper";
import WishList from "../../components/WishList/WishList";
import Watched from "../../components/Watched/Watched";
import DefaultBanner from "../../components/DefaultBanner/DefaultBanner";
const MainPage = () => {
  const listCtxMgr = useContext(listsCtx);

  return (
    <React.Fragment>
      <Form />
      <Wrapper>
        {listCtxMgr.data.length === 0 ? <DefaultBanner /> : <List />}
        {listCtxMgr.wish.length === 0 || <WishList />}
        {listCtxMgr.watched.length === 0 || <Watched />}
      </Wrapper>
    </React.Fragment>
  );
};

export default MainPage;

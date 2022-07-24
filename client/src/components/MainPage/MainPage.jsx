import { listsCtx } from "../../store/lists-ctx";
import React, { useContext } from "react";
import Form from "../../components/Form/Form";
import Wrapper from "../../components/Wrapper/Wrapper";
import Spinner from "../../components/Spinner/Spinner";
import { uiCtx } from "../../store/ui-ctx";
import DefaultBanner from "../../components/DefaultBanner/DefaultBanner";
import UserSecs from "../UserSecs/userSecs";
const MainPage = () => {
  const listCtxMgr = useContext(listsCtx);
  const uiCtxMgr = useContext(uiCtx);
  return (
    <React.Fragment>
      {uiCtxMgr.isLoading && <Spinner />}
      <Form />
      <Wrapper>
        {listCtxMgr.data.length === 0 &&
        listCtxMgr.wish.length === 0 &&
        listCtxMgr.watched.length === 0 ? (
          <DefaultBanner />
        ) : (
          <UserSecs />
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default MainPage;

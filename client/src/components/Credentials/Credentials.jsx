import Wrapper from "../Wrapper/Wrapper";
import classes from "./Credentials.module.css";
import { useContext, useState } from "react";
import { uiCtx } from "../../store/ui-ctx";
import SignUpForm from "../SignUpForm/SignUpForm";
import LoginForm from "../LoginForm/LoginForm";

const Credentials = () => {
  const uiCtxMgr = useContext(uiCtx);

  return (
    <Wrapper>
      <section className={classes.section}>
        <article className={classes.article}>
          <h3 className={classes.h3}>Welcome!</h3>
          <p className={classes.p}>
            Ready to track your popcorn sessions? All those titles organized and
            accounted for, on the touch of a button!
          </p>
        </article>
        {!uiCtxMgr.showLogin ? <SignUpForm /> : <LoginForm />}
      </section>
    </Wrapper>
  );
};

export default Credentials;

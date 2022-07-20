import classes from "../Credentials/Credentials.module.css";
import { useState, useContext } from "react";
import { uiCtx } from "../../store/ui-ctx";

import axios from "axios";

const LoginForm = () => {
  const uiCtxMgr = useContext(uiCtx);

  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    console.log(userLogin);
    // AXIOS CALL API
    uiCtxMgr.setIsLoggedIn(true);
    setUserLogin({
      username: "",
      password: "",
    });
  };
  return (
    <form className={classes.form}>
      <input
        name="username"
        onChange={inputChangeHandler}
        value={userLogin.username}
        className={classes.input}
        type="text"
        placeholder="Username"
      />
      <input
        name="password"
        onChange={inputChangeHandler}
        value={userLogin.password}
        className={classes.input}
        type="text"
        placeholder="Password"
      />
      <input
        onClick={loginHandler}
        className={classes.submit}
        value="Login"
        type="submit"
      />
    </form>
  );
};

export default LoginForm;

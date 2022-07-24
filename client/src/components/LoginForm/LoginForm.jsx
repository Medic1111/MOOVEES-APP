import classes from "../Credentials/Credentials.module.css";
import { useState, useContext } from "react";
import { uiCtx } from "../../store/ui-ctx";
import { listsCtx } from "../../store/lists-ctx";
import axios from "axios";

const LoginForm = () => {
  const uiCtxMgr = useContext(uiCtx);
  const listsCtxMgr = useContext(listsCtx);

  const showResgisterHandler = () => {
    uiCtxMgr.setShowLogin(false);
  };
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  const loginHandler = async (e) => {
    e.preventDefault();
    uiCtxMgr.setIsLoading(true);
    await axios
      .post("/api/login", userLogin)
      .then((serverRes) => {
        uiCtxMgr.setIsLoading(false);

        setError(false);
        listsCtxMgr.setUser(serverRes.data[0]._id);
        listsCtxMgr.setWatched(serverRes.data[0].watched);
        listsCtxMgr.setWish(serverRes.data[0].wish);
        uiCtxMgr.setIsLoggedIn(true);
      })
      .catch((err) => {
        uiCtxMgr.setIsLoading(false);
        setError(true);
        if (err.response.status === 401) setErrorMsg("Wrong Credentials");
        if (err.response.status === 404) setErrorMsg("Not Registered");
        if (err.response.status === 500) setErrorMsg("Server Error");
      });

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
      {error && <p className={classes.feedback}>{errorMsg}</p>}
      <p onClick={showResgisterHandler} className={classes.span}>
        Don't have an account? Register
      </p>
    </form>
  );
};

export default LoginForm;

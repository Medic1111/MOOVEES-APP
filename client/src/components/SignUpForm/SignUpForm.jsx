import classes from "../Credentials/Credentials.module.css";
import { useState, useContext } from "react";
import { uiCtx } from "../../store/ui-ctx";
import { listsCtx } from "../../store/lists-ctx";
import axios from "axios";

const SignUpForm = () => {
  const uiCtxMgr = useContext(uiCtx);
  const listsCtxMgr = useContext(listsCtx);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const logInHandler = () => {
    uiCtxMgr.setShowLogin(true);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    uiCtxMgr.setIsLoading(true);
    await axios
      .post("/api/register", userInput)
      .then((serverRes) => {
        uiCtxMgr.setIsLoading(false);
        setError(false);
        listsCtxMgr.setUser(serverRes.data._id);
        listsCtxMgr.setWish(serverRes.data.wish);
        listsCtxMgr.setWatched(serverRes.data.watched);
        uiCtxMgr.setIsLoggedIn(true);
      })
      .catch((err) => {
        uiCtxMgr.setIsLoading(false);
        setError(true);
        if (err.response.status === 409) setErrorMsg("Already Registered");
        if (err.response.status === 400) setErrorMsg("Incomplete Form");
        if (err.response.status === 500) setErrorMsg("Server Error");
      });

    setUserInput({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <form className={classes.form}>
      <input
        name="username"
        onChange={inputChangeHandler}
        value={userInput.username}
        className={classes.input}
        type="text"
        placeholder="Username"
      />
      <input
        name="email"
        onChange={inputChangeHandler}
        value={userInput.email}
        className={classes.input}
        type="email"
        placeholder="Email"
      />
      <input
        name="password"
        onChange={inputChangeHandler}
        value={userInput.password}
        className={classes.input}
        type="password"
        placeholder="Password"
      />
      <input
        onClick={signUpHandler}
        className={classes.submit}
        value="Sign Up"
        type="submit"
      />
      {error && <p className={classes.feedback}>{errorMsg}</p>}
      <p className={classes.span} onClick={logInHandler}>
        Already Registered? Login
      </p>
    </form>
  );
};

export default SignUpForm;

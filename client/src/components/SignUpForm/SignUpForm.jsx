import classes from "../Credentials/Credentials.module.css";
import { useState, useContext } from "react";
import { uiCtx } from "../../store/ui-ctx";
import axios from "axios";

const SignUpForm = () => {
  const uiCtxMgr = useContext(uiCtx);

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

  const signUpHandler = (e) => {
    e.preventDefault();
    console.log(userInput);
    // AXIOS CALL API
    axios
      .post("/api/register", userInput)
      .then((serverRes) => {
        console.log(serverRes.data);
      })
      .catch((err) => {
        console.log(err);
      });

    uiCtxMgr.setIsLoggedIn(true);

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
        type="text"
        placeholder="Email"
      />
      <input
        name="password"
        onChange={inputChangeHandler}
        value={userInput.password}
        className={classes.input}
        type="text"
        placeholder="Password"
      />
      <input
        onClick={signUpHandler}
        className={classes.submit}
        value="Sign Up"
        type="submit"
      />
    </form>
  );
};

export default SignUpForm;

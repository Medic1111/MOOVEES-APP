import classes from "./Form.module.css";
import axios from "axios";
import { useState, useContext } from "react";
import { listsCtx } from "../../store/lists-ctx";
import { uiCtx } from "../../store/ui-ctx";

const Form = () => {
  const listCtxMgr = useContext(listsCtx);
  const uiCtxMgr = useContext(uiCtx);

  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const postToApiHandler = async (e) => {
    uiCtxMgr.setIsLoading(true);
    e.preventDefault();
    await axios
      .post("/api/movies/title", { userInput })
      .then((serverRes) => {
        uiCtxMgr.setIsLoading(false);
        setError(false);
        setServerError(false);
        listCtxMgr.setData(serverRes.data);
      })
      .catch((err) => {
        uiCtxMgr.setIsLoading(false);
        err.response.status === 404 && setError(true);
        err.response.status === 500 && setServerError(true);
      });
  };

  return (
    <form className={classes.form}>
      <input
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
        className={classes.input}
        type="text"
        placeholder="Movie Title"
      />
      <input
        onClick={postToApiHandler}
        className={classes.submit}
        type="submit"
      />
      {error && <p>THIS MOVIE DOES NOT EXIT</p>}
      {serverError && <p>Oops, something went wrong, please try again</p>}
      {/* CHANGE CSS FOR THIS, SIDEWAYS WITH FORM */}
    </form>
  );
};

export default Form;

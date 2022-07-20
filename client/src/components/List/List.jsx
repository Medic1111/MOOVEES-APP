import React from "react";
import ListItem from "../ListItem/ListItem";
import classes from "./List.module.css";
import { listsCtx } from "../../store/lists-ctx";
import { useContext } from "react";

const List = () => {
  const listCtxMgr = useContext(listsCtx);

  return (
    <React.Fragment>
      <h2 className={classes.h2}>RESULTS:</h2>
      <ul className={classes.ul}>
        {listCtxMgr.data.map((obj, index) => {
          if (obj.Poster !== "N/A") {
            return <ListItem key={`MOVIE_${index}`} obj={obj} />;
          }
        })}
      </ul>
    </React.Fragment>
  );
};

export default List;

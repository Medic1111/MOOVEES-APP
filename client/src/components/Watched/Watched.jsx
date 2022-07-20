import classes from "../List/List.module.css";
import React from "react";
import WatchedListItem from "../WatchedListItem/WatchedListItem";
import { useContext } from "react";
import { listsCtx } from "../../store/lists-ctx";

const Watched = () => {
  const listCtxMgr = useContext(listsCtx);

  return (
    <React.Fragment>
      <h2 className={classes.h2}>WATCHED:</h2>
      <ul className={classes.ul}>
        {listCtxMgr.watched.map((obj, index) => {
          if (obj.Poster !== "N/A") {
            return <WatchedListItem key={`MOVIE_${index}`} obj={obj} />;
          }
        })}
      </ul>
    </React.Fragment>
  );
};

export default Watched;

import classes from "../List/List.module.css";
import React from "react";
import WatchedListItem from "../WatchedListItem/WatchedListItem";
const Watched = ({ watched, setWatched }) => {
  return (
    <React.Fragment>
      <h2 className={classes.h2}>WATCHED:</h2>
      <ul className={classes.ul}>
        {watched.map((obj, index) => {
          if (obj.Poster !== "N/A") {
            return (
              <WatchedListItem
                key={`MOVIE_${index}`}
                obj={obj}
                setWatched={setWatched}
                watched={watched}
              />
            );
          }
        })}
      </ul>
    </React.Fragment>
  );
};

export default Watched;

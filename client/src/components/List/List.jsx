import React from "react";
import ListItem from "../ListItem/ListItem";
import classes from "./List.module.css";

const List = ({ data, setWatched, setWish }) => {
  return (
    <React.Fragment>
      <h2 className={classes.h2}>RESULTS:</h2>
      <ul className={classes.ul}>
        {data.map((obj, index) => {
          if (obj.Poster !== "N/A") {
            return (
              <ListItem
                key={`MOVIE_${index}`}
                obj={obj}
                setWatched={setWatched}
                setWish={setWish}
              />
            );
          }
        })}
      </ul>
    </React.Fragment>
  );
};

export default List;

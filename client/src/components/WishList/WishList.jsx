import classes from "../List/List.module.css";
import React, { useState } from "react";
import WishListItem from "../WishListItem/WishListItem";
const WishList = ({ wish, setWatched, setWish }) => {
  return (
    <React.Fragment>
      <h2 className={classes.h2}>WISHLIST:</h2>
      <ul className={classes.ul}>
        {wish.map((obj, index) => {
          if (obj.Poster !== "N/A") {
            return (
              <WishListItem
                key={`WISH_${index}`}
                obj={obj}
                setWatched={setWatched}
                setWish={setWish}
                wish={wish}
              />
            );
          }
        })}
      </ul>
    </React.Fragment>
  );
};

export default WishList;

import classes from "../List/List.module.css";
import React, { useContext } from "react";
import WishListItem from "../WishListItem/WishListItem";
import { listsCtx } from "../../store/lists-ctx";

const WishList = () => {
  const listCtxMgr = useContext(listsCtx);

  return (
    <React.Fragment>
      <h2 className={classes.h2}>WISHLIST:</h2>
      <ul className={classes.ul}>
        {listCtxMgr.wish.map((obj, index) => {
          if (obj.Poster !== "N/A") {
            return <WishListItem key={`WISH_${index}`} obj={obj} />;
          }
        })}
      </ul>
    </React.Fragment>
  );
};

export default WishList;

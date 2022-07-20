import classes from "../ListItem/ListItem.module.css";
import { listsCtx } from "../../store/lists-ctx";
import { useContext } from "react";

const ListItem = ({ obj }) => {
  const listCtxMgr = useContext(listsCtx);

  const addToWatchedHandler = () => {
    listCtxMgr.setWatched((prev) => [...prev, obj]);
    listCtxMgr.setWish(() => {
      return listCtxMgr.wish.filter((objRet) => {
        return objRet !== obj;
      });
    });
  };

  const removeFromWatchedHandler = () => {
    listCtxMgr.setWish(() => {
      return listCtxMgr.wish.filter((objRet) => {
        return objRet !== obj;
      });
    });
  };

  return (
    <li className={classes.li}>
      <p className={classes.pTitle}>{obj.Title}</p>
      <p className={classes.pYear}>{obj.Year}</p>
      <img src={obj.Poster} />
      <div className={classes.btnBox}>
        <button onClick={addToWatchedHandler} className={classes.btn}>
          + Watched
        </button>
        <button onClick={removeFromWatchedHandler} className={classes.btn}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default ListItem;

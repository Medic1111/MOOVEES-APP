import classes from "../ListItem/ListItem.module.css";
import { useState } from "react";
import Stars from "../Stars/Stars";
import { useContext } from "react";
import { listsCtx } from "../../store/lists-ctx";

const WatchedListItem = ({ obj }) => {
  const [rate, setRate] = useState(["☆", "☆", "☆", "☆", "☆"]);
  const listCtxMgr = useContext(listsCtx);

  const removeFromWatchedHandler = () => {
    listCtxMgr.setWatched(() => {
      return listCtxMgr.watched.filter((objRet) => {
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
        <p className={classes.stars}>
          {rate.map((item, index) => {
            return (
              <Stars
                key={`STAR_${index}`}
                item={item}
                index={index}
                setRate={setRate}
                rate={rate}
              />
            );
          })}
        </p>
        <button onClick={removeFromWatchedHandler} className={classes.btn}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default WatchedListItem;

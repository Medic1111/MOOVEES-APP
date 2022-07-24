import classes from "../ListItem/ListItem.module.css";
import { useState } from "react";
import Stars from "../Stars/Stars";
import { useContext } from "react";
import { listsCtx } from "../../store/lists-ctx";
import { detailCtx } from "../../store/detail-ctx";
import { uiCtx } from "../../store/ui-ctx";
import axios from "axios";

const WatchedListItem = ({ obj }) => {
  const [rate, setRate] = useState(["☆", "☆", "☆", "☆", "☆"]);
  const listCtxMgr = useContext(listsCtx);
  const detailCtxMgr = useContext(detailCtx);
  const uiCtxMgr = useContext(uiCtx);

  const detailHandler = async () => {
    let id = obj.imdbID;
    await axios
      .get(`/api/movie/${id}`)
      .then((serverRes) => {
        detailCtxMgr.setDetailInfo(serverRes.data);
        uiCtxMgr.setShowModal(true);
      })
      .catch((err) => console.log(err));
  };

  const removeFromWatchedHandler = () => {
    const movie = obj.imdbID;
    const id = listCtxMgr.user;
    uiCtxMgr.setIsLoading(true);

    axios
      .patch(`/api/${id}/watched/remove/${movie}`)
      .then((serverRes) => {
        uiCtxMgr.setIsLoading(false);

        listCtxMgr.setWatched(() => {
          return listCtxMgr.watched.filter((objRet) => {
            return objRet !== obj;
          });
        });
      })
      .catch((err) => {
        uiCtxMgr.setIsLoading(false);

        console.log(err);
      });
  };

  return (
    <li className={classes.li}>
      <p className={classes.pTitle}>{obj.Title}</p>
      <p className={classes.pYear}>{obj.Year}</p>
      <img onClick={detailHandler} src={obj.Poster} />
      <div className={classes.btnBox}>
        {/* <p className={classes.stars}>
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
        </p> */}
        <button onClick={removeFromWatchedHandler} className={classes.btn}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default WatchedListItem;

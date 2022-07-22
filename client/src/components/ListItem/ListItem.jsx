import classes from "./ListItem.module.css";
import { useContext } from "react";
import { listsCtx } from "../../store/lists-ctx";
import { detailCtx } from "../../store/detail-ctx";
import { uiCtx } from "../../store/ui-ctx";

import axios from "axios";

const ListItem = ({ obj }) => {
  const listCtxMgr = useContext(listsCtx);
  const detailCtxMgr = useContext(detailCtx);
  const uiCtxMgr = useContext(uiCtx);

  const addToWatchedHandler = async () => {
    await axios
      .post(`/api/${listCtxMgr.user}/watched`, obj)
      .then((serverRes) => {
        listCtxMgr.setWatched(serverRes.data);
      })
      .catch((err) => {
        console.log(err);
        // ADDRESS SERVER ERRORS
      });
  };

  const addToWishHandler = async () => {
    await axios
      .post(`/api/${listCtxMgr.user}/wish`, obj)
      .then((serverRes) => {
        console.log(serverRes.data);
        listCtxMgr.setWish(serverRes.data);
      })
      .catch((err) => {
        console.log(err);
        // ADDRESS SERVER ERRORS
      });
  };

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

  return (
    <li className={classes.li}>
      <p className={classes.pTitle}>{obj.Title}</p>
      <p className={classes.pYear}>{obj.Year}</p>
      <img onClick={detailHandler} src={obj.Poster} />
      <div className={classes.btnBox}>
        <button onClick={addToWatchedHandler} className={classes.btn}>
          + Watched
        </button>
        <button onClick={addToWishHandler} className={classes.btn}>
          + Wish
        </button>
      </div>
    </li>
  );
};

export default ListItem;

import classes from "../ListItem/ListItem.module.css";
import { listsCtx } from "../../store/lists-ctx";
import { useContext } from "react";
import { detailCtx } from "../../store/detail-ctx";
import { uiCtx } from "../../store/ui-ctx";
import axios from "axios";

const ListItem = ({ obj }) => {
  const listCtxMgr = useContext(listsCtx);
  const detailCtxMgr = useContext(detailCtx);
  const uiCtxMgr = useContext(uiCtx);

  const detailHandler = async () => {
    let id = obj.imdbID;
    uiCtxMgr.setIsLoading(true);
    await axios
      .get(`/api/movie/${id}`)
      .then((serverRes) => {
        detailCtxMgr.setDetailInfo(serverRes.data);
        uiCtxMgr.setShowModal(true);
        uiCtxMgr.setIsLoading(false);
      })
      .catch((err) => {
        uiCtxMgr.setIsLoading(false);
      });
  };
  const moveToWatchedHandler = async () => {
    const movie = obj.imdbID;
    const id = listCtxMgr.user;
    uiCtxMgr.setIsLoading(true);

    await axios
      .patch(`/api/${id}/wishlist/watched/${movie}`)
      .then((serverRes) => {
        uiCtxMgr.setIsLoading(false);
        listCtxMgr.setWatched((prev) => [...prev, obj]);
        listCtxMgr.setWish(() => {
          return listCtxMgr.wish.filter((objRet) => {
            return objRet !== obj;
          });
        });
      })
      .catch((err) => {
        uiCtxMgr.setIsLoading(false);
      });
  };

  const removeFromWishHandler = async () => {
    const movie = obj.imdbID;
    const id = listCtxMgr.user;
    uiCtxMgr.setIsLoading(true);

    await axios
      .patch(`/api/${id}/wishlist/remove/${movie}`)
      .then((serverRes) => {
        uiCtxMgr.setIsLoading(false);
        listCtxMgr.setWish(() => {
          return listCtxMgr.wish.filter((objRet) => {
            return objRet !== obj;
          });
        });
      })
      .catch((err) => {
        uiCtxMgr.setIsLoading(false);
      });
  };

  return (
    <li className={classes.li}>
      <p className={classes.pTitle}>{obj.Title}</p>
      <p className={classes.pYear}>{obj.Year}</p>
      <img onClick={detailHandler} src={obj.Poster} />
      <div className={classes.btnBox}>
        <button onClick={moveToWatchedHandler} className={classes.btn}>
          + Watched
        </button>
        <button onClick={removeFromWishHandler} className={classes.btn}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default ListItem;

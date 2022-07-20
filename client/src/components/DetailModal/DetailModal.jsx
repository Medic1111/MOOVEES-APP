import classes from "./DetailModal.module.css";
import Portal from "../Portal/Portal";
import { useContext } from "react";
import { detailCtx } from "../../store/detail-ctx";
import { uiCtx } from "../../store/ui-ctx";

const DetailModal = () => {
  const detailCtxMgr = useContext(detailCtx);
  const uiCtxMgr = useContext(uiCtx);

  const closeModalHandler = () => {
    uiCtxMgr.setShowModal(false);
  };

  const movie = detailCtxMgr.detailInfo;
  return (
    <Portal>
      <section className={classes.section}>
        <img className={classes.img} src={movie.Poster} />
        <div className={classes.txtBox}>
          <p className={classes.title}>{movie.Title}</p>
          <p className={classes.year}>Released: {movie.Year}</p>
          <p className={classes.duration}>Duration: {movie.Runtime}</p>
          <p className={classes.plot}>{movie.Plot}</p>
          <p className={classes.director}>Directed by: {movie.Director}</p>
          <p className={classes.actors}>Cast: {movie.Actors}</p>
          <button onClick={closeModalHandler} className={classes.btn}>
            Return
          </button>
        </div>
      </section>
    </Portal>
  );
};

export default DetailModal;

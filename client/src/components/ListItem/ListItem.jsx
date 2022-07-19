import classes from "./ListItem.module.css";

const ListItem = ({ obj, setWatched, setWish }) => {
  const addToWatchedHandler = () => {
    setWatched((prev) => [...prev, obj]);
  };

  const addToWishHandler = () => {
    setWish((prev) => [...prev, obj]);
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
        <button onClick={addToWishHandler} className={classes.btn}>
          + Wish
        </button>
      </div>
    </li>
  );
};

export default ListItem;

import classes from "../ListItem/ListItem.module.css";

const ListItem = ({ obj, setWatched, setWish, wish }) => {
  const addToWatchedHandler = () => {
    setWatched((prev) => [...prev, obj]);
    setWish(() => {
      return wish.filter((objRet) => {
        return objRet !== obj;
      });
    });
  };

  const removeFromWatchedHandler = () => {
    setWish(() => {
      return wish.filter((objRet) => {
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

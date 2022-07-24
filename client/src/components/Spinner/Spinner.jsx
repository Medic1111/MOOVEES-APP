import classes from "./Spinner.module.css";
import Portal from "../Portal/Portal";

const Spinner = () => {
  return (
    <Portal>
      <div className={classes.wrapper}>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
        <div className={classes.shadow}></div>
        <div className={classes.shadow}></div>
        <div className={classes.shadow}></div>
      </div>
    </Portal>
  );
};

export default Spinner;

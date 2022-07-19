import classes from "./DefaultBanner.module.css";
import HeroImg from "../../assets/hero.jpg";
import React from "react";

const DefaultBanner = () => {
  return (
    <React.Fragment>
      <img className={classes.img} src={HeroImg} />
      <div className={classes.div}>
        <h3 className={classes.h3}>
          Begin your moovee journey by searching a title
        </h3>
      </div>
    </React.Fragment>
  );
};

export default DefaultBanner;

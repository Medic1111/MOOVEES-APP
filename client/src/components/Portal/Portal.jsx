import React from "react";
import ReactDOM from "react-dom";
import classes from "./Portal.module.css";

const portalRoot = document.getElementById("portal");

const Wrapper = (props) => {
  return <article className={classes.article}>{props.children}</article>;
};

const Portal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Wrapper>{props.children}</Wrapper>, portalRoot)}
    </React.Fragment>
  );
};

export default Portal;

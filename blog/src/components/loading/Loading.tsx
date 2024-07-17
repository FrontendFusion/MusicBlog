import React from "react";
import classes from "./Loading.module.scss";

const Loading = (): JSX.Element => {
  return (
    <div className={classes.box}>
      <div className={classes.loader}>
        <div className={classes.loader__bar}></div>
        <div className={classes.loader__bar}></div>
        <div className={classes.loader__bar}></div>
        <div className={classes.loader__bar}></div>
        <div className={classes.loader__bar}></div>
        <div className={classes.loader__ball}></div>
      </div>
    </div>
  );
};

export default Loading;

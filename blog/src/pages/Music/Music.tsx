import React from "react";
import classes from "./Music.module.scss";
import MusicHome from "./components/musicHome/musicHome";
import MusicSearch from "./components/musicSearch/musicSearch";

const Music = () => {

  return (
    <div className={classes.music}>
      <div>
        <div className={classes.inner_box}>
          <div className={classes.main}>
            <MusicHome></MusicHome>
            <MusicSearch></MusicSearch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;

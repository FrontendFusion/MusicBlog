import MusicContext from "@/context/musicContext";
import React, { useContext, useEffect } from "react";
import MusicItem from "../MusicItem/MusicItem";
import classes from "./MusicList.module.scss";

const MusicList = (props: { dataList: any[] }) => {
  const { dataList = [] } = props;
  const { changeMusicPlay, changeMusicList, changeCurIndex } = useContext(MusicContext);

  return (
    <div className={classes.viewBox}>
      <div>
        {dataList.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              changeMusicList(dataList);
              changeCurIndex(index);
              changeMusicPlay();
            }}
          >
            <MusicItem item={item}>
              <div>{String(index + 1).padStart(2, "0")}</div>
            </MusicItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicList;

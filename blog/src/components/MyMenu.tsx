import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./MyMenu.module.scss";
import { Button, Space } from "@arco-design/web-react";
import {
  IconMusic,
  IconPause,
  IconPlayArrow,
  IconSkipNext,
  IconSkipPrevious,
} from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";
import { secondaryRoutes } from "@/router/index";
import { pxToRem } from "@/utils/rem";
import MusicContext from "@/context/musicContext";
import { getAuthor } from "@/utils";
import { getUserInfo } from "@/request/request";
import Marquee from "react-fast-marquee";

const MyMenu = () => {
  // 主题选中
  const [isChecked, setIsChecked] = useState<boolean>(() => {
    return sessionStorage.getItem("theme") == "dark" ? true : false;
  });

  const [personalInfo, setPersonalInfo] = useState<any>({});

  const {
    musicList,
    changeMusicPlay,
    curIndex,
    nextMusic,
    prevMusic,
    isPlay,
    playMusic,
    pauseMusic,
  } = useContext(MusicContext);

  // 搜索框显示

  const spanRef = useRef<HTMLSpanElement>(null);

  const nv = useNavigate();
  // 切换主题
  const changeTheme = () => {
    document.documentElement.setAttribute(
      "data-theme",
      isChecked ? "dark" : "light"
    );
    sessionStorage.setItem("theme", isChecked ? "dark" : "light");
  };

  // 切换菜单
  const changeMenu = (path: string, e?: React.SyntheticEvent) => {
    const el = document.querySelector(
      `[data-path="${path}"]`
    ) as HTMLSpanElement;
    console.log(e);
    const leftValue =
      (e?.target as HTMLSpanElement)?.offsetLeft || el?.offsetLeft;
    const widthValue =
      (e?.target as HTMLSpanElement)?.offsetWidth || el?.offsetWidth;
    spanRef.current?.style.setProperty("--left", pxToRem(leftValue));
    spanRef.current?.style.setProperty("--width", pxToRem(widthValue));
    nv(path);
    sessionStorage.setItem("curMune", path);
  };

  // 获取个人信息
  const getPersonInfo = async () => {
    const userId = localStorage.getItem("userId") as string;
    try {
      const res = await getUserInfo(userId);
      console.error(res);
      localStorage.setItem("id", res.data[0].id);
      setPersonalInfo(res.data[0].attributes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const curMune = (sessionStorage.getItem("curMune") as string) || "blog";
    changeMenu(curMune);
    getPersonInfo();
  }, []);

  useEffect(() => {
    changeTheme();
  }, [isChecked]);

  return (
    <div className={classes.box}>
      <div className={classes.personInfo}>
        <div className={classes.left}>
          <div className={classes.photo}>
            <img src={require("@/assets/image/user.webp")} alt="" />
          </div>
          <div className={classes.info}>
            <p>
              <span>name：</span>
              <span title={personalInfo.username || "-"}>
                {personalInfo.username || "-"}
              </span>
            </p>
            <p>
              <span>sex：</span>
              <span title={personalInfo.sex || "-"}>
                {personalInfo.sex || "-"}
              </span>
            </p>
            <p>
              <span>Email：</span>
              <span title={personalInfo.email || "-"}>
                {personalInfo.email || "-"}
              </span>
            </p>
            <p>
              <span>Phone：</span>
              <span title={personalInfo.phone || "-"}>
                {personalInfo.phone || "-"}
              </span>
            </p>
            <Space>
              <Button
                size="mini"
                type="primary"
                className={classes.btn}
                onClick={() => {
                  window.open("/personal");
                }}
              >
                View More
              </Button>
              <Button
                type="primary"
                size="mini"
                className={classes.btn}
                style={{ backgroundColor: "rgb(70, 30, 100)" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("id");
                  localStorage.removeItem("userId");
                  nv("/login");
                }}
              >
                Log Out
              </Button>
            </Space>
          </div>
        </div>
      </div>
      <div className={classes.musicPanel}>
        <IconMusic className={classes.icon}/>
        {musicList.length > 0 && (
          <div className={classes.musicInfo}>
            <Marquee className={classes.marquee} speed={20} play={isPlay} delay={1}>
              {musicList[curIndex].song.name} —{" "}
              {getAuthor(musicList[curIndex].song.artists)}
            </Marquee>
            <div>
              <IconSkipPrevious
                className={classes.icon}
                onClick={() => {
                  prevMusic();
                  changeMusicPlay();
                }}
              />
              {isPlay ? (
                <IconPause
                  className={classes.icon}
                  onClick={() => {
                    pauseMusic();
                  }}
                />
              ) : (
                <IconPlayArrow
                  className={classes.icon}
                  onClick={() => {
                    playMusic();
                  }}
                />
              )}

              <IconSkipNext
                className={classes.icon}
                onClick={() => {
                  nextMusic();
                  changeMusicPlay();
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className={classes.menu} id="menu">
        <div className={classes.menuList}>
          {secondaryRoutes.map(
            (item) =>
              item.name && (
                <span
                  data-path={item.path}
                  className={classes.menuItem}
                  key={item.path}
                  onClick={(e) => {
                    changeMenu(item.path, e);
                  }}
                >
                  {item.name}
                </span>
              )
          )}
          <span className={classes.menuSlider} ref={spanRef}></span>
        </div>
        <label className={classes.switch}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              setIsChecked((pre) => !pre);
            }}
          />
          <span className={classes.slider}></span>
        </label>
      </div>
    </div>
  );
};

export default MyMenu;

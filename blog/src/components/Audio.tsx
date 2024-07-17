import MusicContext from "@/context/musicContext";
import { Message } from "@arco-design/web-react";
import React, { useEffect, useRef, useState } from "react";

const Audio = (props: any) => {
  const [musicList, setMusicList] = useState<any[]>([]);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [curIndex, setCurIndex] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const changeMusicList = (list: any) => {
    setMusicList(list);
  };

  const changeCurIndex = (index: number) => {
    setCurIndex(index);
  };

  // 播放
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current?.play();
      setIsPlay(true);
    }
  };

  // 暂停
  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current?.pause();
      setIsPlay(false);
    }
  };

  // 下一首
  const nextMusic = () => {
    if (curIndex === musicList.length - 1) {
      setCurIndex(0);
    } else {
      setCurIndex(curIndex + 1);
    }
  };

  // 上一首
  const prevMusic = () => {
    if (curIndex === 0) {
      setCurIndex(musicList.length - 1);
    } else {
      setCurIndex(curIndex - 1);
    }
  };

  // 切换
  const changeMusicPlay = () => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.oncanplay = () => {
        audioRef.current?.play();
        setIsPlay(true);
      };
    }
  };

  return (
    <MusicContext.Provider
      value={{
        playMusic,
        pauseMusic,
        isPlay,
        nextMusic,
        prevMusic,
        changeCurIndex,
        changeMusicPlay,
        changeMusicList,
        musicList,
        curIndex,
      }}
    >
      <audio
        src={`https://music.163.com/song/media/outer/url?id=${musicList[curIndex]?.song?.id}.mp3`}
        ref={audioRef}
        onEnded={() => {
          nextMusic();
          changeMusicPlay();
        }}
        onError={() => {
          if (musicList[curIndex]?.song?.id) {
            Message.info({
              content: "当前音乐为vip专属音乐，暂时无法播放！",
              duration: 1000,
            });
            pauseMusic();
          }
        }}
      ></audio>
      {props.children}
    </MusicContext.Provider>
  );
};

export default Audio;

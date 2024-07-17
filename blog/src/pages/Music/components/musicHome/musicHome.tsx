import React, { useEffect, useState } from "react";
import { Carousel } from "@arco-design/web-react";
import MusicList from "../MusicList/MusicList";
import classes from "./musicHome.module.scss";
import { getBanner, getRecommendedMusic } from "@/request/musicRequest";

const MusicHome = () => {
  const [musicList, setMusicList] = useState([]);
  const [bannerInfo, setBannerInfo] = useState<any[]>([]);

  const getBannerInfo = async () => {
    try {
      const res: any = await getBanner();
      console.log("res", res);
      setBannerInfo(res.banners);
    } catch (error) {
      console.error(error);
    }
  };

  // 获取推荐新音乐
  const getMusic = async () => {
    try {
      const res: any = await getRecommendedMusic();
      setMusicList(res.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBannerInfo();
    getMusic();
  }, []);
  return (
    <div className={`${classes.view_box}`}>
      <h2>Recommendation</h2>
      <Carousel
        className={classes.carousel}
        showArrow="never"
        direction="vertical"
        indicatorPosition="bottom"
        indicatorType="line"
        trigger="click"
        animation="fade"
        autoPlay
      >
        {bannerInfo.map((item, index) => (
          <div key={index}>
            <img
              src={item.imageUrl}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>
      <section>
        <h4>Trending right now</h4>
      </section>
      <MusicList dataList={musicList}></MusicList>
    </div>
  );
};

export default MusicHome;

import React, { useEffect, useRef, useState } from "react";
import classes from "./CarouselChart.module.scss";

const offsetStep = 200;
const scaleStep = 0.8;
const rotateY = 45;
const opcity = 0.98;

const data = [
    { imgPath: require("@/assets/image/js_cover.jpg") },
    { imgPath: require("@/assets/image/css_cover.webp") },
    { imgPath: require("@/assets/image/html_cover.webp") },
    { imgPath: require("@/assets/image/react_cover.jpeg") },
    { imgPath: require("@/assets/image/vue_cover.jpg") },
    { imgPath: require("@/assets/image/unip_cover.webp") },
    { imgPath: require("@/assets/image/node_cover.jpg") },
];



const CarouselChart = () => {
  const [curIndex, setCurIndex] = useState<number>(() => {
    return Math.floor(data.length / 2);
  });
  const listRef = useRef<HTMLDivElement>(null);

  const next = () => {
    if (curIndex == listRef.current!.childNodes.length - 1) {
      return;
    }
    setCurIndex((pre) => pre + 1);
    layOut();
  };

  const prev = () => {
    if (curIndex == 0) {
      return;
    }
    setCurIndex((pre) => pre - 1);
    layOut();
  };

  const layOut = () => {
    let list = Array.from(
      listRef.current!.childNodes as NodeListOf<HTMLImageElement>
    );
    for (let i = 0; i < list.length; i++) {
      let sign = Math.sign(i - curIndex);
      list[i].style.transform = `translateX(${
        (i - curIndex) * offsetStep
      }px) scale(${scaleStep ** Math.abs(i - curIndex)}) rotateY(${
        -sign * rotateY
      }deg)`;
      list[i].style.opacity = opcity ** Math.abs(i - curIndex) + "";
      list[i].style.zIndex = list.length - Math.abs(i - curIndex) + "";
    }
  };

  const clickHandler = (index: number) => {
    setCurIndex(index);
    layOut();
  };

  useEffect(() => {
    layOut();
    listRef.current!.childNodes.forEach((item: any, index: number) => {
      item.addEventListener("click", () => {});
    });
  });

  return (
    <div className={classes.carouselChart}>
      <div className={classes.prev} onClick={prev}>
        {"<"}
      </div>
      <div className={classes.carouselList} ref={listRef}>
        {data.map((item, index) => (
          <img
            src={item.imgPath}
            alt=""
            className={classes.carouselItem}
            onClick={() => {
              clickHandler(index);
            }}
            key={index}
          />
        ))}
      </div>
      <div className={classes.next} onClick={next}>
        {">"}
      </div>
    </div>
  );
};

export default CarouselChart;

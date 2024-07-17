import { setRem } from "@/utils/rem";
import { Skeleton, Image, Space } from "@arco-design/web-react";
import React, { useEffect, useRef, useState } from "react";
import { DataListType, ItemType } from "../type";
import classes from "./ViewWindow.module.scss";

const ViewWindow = (props: {
  colGap: number; // 列距
  rowGap: number; // 行距
  columnWidth: number; // 卡片宽度
  data: any[]; // 数据源
  getDataList: () => void; // 请求数据函数
}) => {
  const { colGap, rowGap, columnWidth, data, getDataList } = props;

  // 可视区域div
  const viewBox = useRef<HTMLDivElement | null>(null);

  // 可是区域div高度
  const [viewHeight, setViewHeight] = useState<number>(0);

  // 列数
  const [columnCount, setColumnCount] = useState<number>(0);

  // 滚动条距离顶部的距离
  const [start, setStart] = useState<number>(0);

  // 数据列表
  const [dataList, setDataList] = useState<DataListType>({
    list: [], // 数据列表
    columnsInfo: [], // 每列的高度
  });

  // 设置可视容器高度、行数
  const changeColumnCount = () => {
    // 列数*（列宽+列距）- 列距 = 总宽度
    const count = Math.floor(
      (viewBox.current?.clientWidth + colGap) / (columnWidth + colGap)
    );
    setViewHeight(viewBox.current?.clientHeight);
    setColumnCount(count);
  };

  // 初始化所有数据信息（每张图片盒子的样式）
  const initVisibleData = (count: number, data: any[]) => {
    let arr: DataListType = {
      list: [], // 数据源（所有图片的信息）
      columnsInfo: new Array(count).fill(0), // 每列的高度（这列图片数 * （高度 + 行距））
    };
    if (count > 0) {
      for (let item of data) {
        let { minIndex, minHeight } = calculateHeight(arr.columnsInfo);
        // 计算图片的高度
        const height = Math.round(
          columnWidth / (item.picInfo.width / item.picInfo.height)
        );
        let style = {
          width: columnWidth,
          height,
          transform: `translate(${
            minIndex * (columnWidth + colGap)
          }px,${minHeight}px)`,
        };
        arr.list.push({
          pathImg: `http://localhost:1337${item.picInfo.url}`,
          des: item.des,
          offsetTop: minHeight,
          style,
        });
        arr.columnsInfo[minIndex] = minHeight + rowGap + height;
      }
      initListStyle(columnCount, arr.columnsInfo);
    }
    setDataList({ ...arr });
  };

  // 判断是否显示
  const isShow = (item: ItemType) => {
    return (
      item.style.height + item.offsetTop > start &&
      item.offsetTop < start + viewHeight
    );
  };

  // 是否滚动到底部
  const isEnd = () => {
    // 计算每列高度时多加了一个行距，减20是为了去除滚动误差
    if (Math.min(...dataList.columnsInfo) - rowGap - 20 < start + viewHeight) {
      getDataList();
    }
  };

  // 返回最小高度，最大高度，最小高度列下标
  const calculateHeight = (arr: number[]) => {
    let minHeight = Infinity;
    let maxHeight = -Infinity;
    let minIndex = -1;

    arr.forEach((height, index) => {
      if (height < minHeight) {
        minHeight = height;
        minIndex = index;
      }
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    return {
      minHeight,
      maxHeight,
      minIndex,
    };
  };

  // 滚动函数
  const scrollHandler = (e: any) => {
    setStart(e.target.scrollTop);
    isEnd();
  };

  // 渲染数据（渲染可视范围内的数据）
  const renderData = dataList.list.filter((item) => isShow(item));

  // 初始化列表div样式
  const initListStyle = (
    columnCount: number, // 列数
    list: number[] //
  ) => {
    const width = (columnWidth + colGap) * columnCount - colGap;
    const height = list.length ? calculateHeight(list).maxHeight - rowGap : 0;
    const listDiv = viewBox.current!.firstChild as HTMLDivElement;
    listDiv.style.setProperty("--width", `${width}px`);
    listDiv.style.setProperty("--height", `${height}px`);
  };

  window.onresize = () => {
    setRem();
    changeColumnCount();
  };

  // 页面加载完毕先计算列数
  useEffect(() => {
    changeColumnCount();
  }, []);

  // 列数改变初始化数据
  useEffect(() => {
    initVisibleData(columnCount, data);
  }, [columnCount, data]);

  return (
    <div ref={viewBox} className={classes.viewWindow} onScroll={scrollHandler}>
      <div className={classes.list}>
        {renderData.map((el, index) => {
          return (
            <div className={classes.item} key={index} style={el.style}>
              <Image
                src={el.pathImg}
                alt=""
                preview={false}
                loader={
                  <Skeleton
                    image={{ style: { width: "100%", height: "100%" } }}
                    text={false}
                    animation
                  />
                }
              />
              <p>{el.des}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewWindow;

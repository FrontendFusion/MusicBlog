import React from "react";
import { Image, Space, Skeleton } from "@arco-design/web-react";
import Col from "@arco-design/web-react/es/Grid/col";
import Row from "@arco-design/web-react/es/Grid/row";
import classes from "./MusicItem.module.scss";
import { getAuthor, processingTime } from "@/utils";

const MusicItem = (props: any) => {
  const { item = {} } = props;

 

  return (
    <div className={classes.row}>
      <Row justify="space-around" align="center" gutter={10}>
        <Col span={2}>{props.children}</Col>
        <Col span={4}>
          <div className={classes.poster}>
            <Image
              width={"100%"}
              height={"100%"}
              src={item.picUrl}
              preview={false}
              alt="lamp"
              lazyload={{ threshold: 0.5 }}
              loader={
                <Skeleton
                  image={{ style: { width: 40, height: 40 } }}
                  text={false}
                  animation
                />
              }
            />
          </div>
        </Col>
        <Col span={14}>
          <Space direction="vertical" size={10} style={{ width: "100%" }}>
            <p title={item.song.name}>{item.song.name}</p>
            <p title={getAuthor(item.song.artists)} className={classes.author}>
              {getAuthor(item.song.artists)}
            </p>
          </Space>
        </Col>
        <Col span={4}>
          <span className={classes.time}>
            {processingTime(item.song.duration)}
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default MusicItem;

import React, { useEffect, useState } from "react";
import { getBlogDetail, getRelatedBlogData } from "@/request/request";
import { dateConversion } from "@/utils";
import { List, Space, Tooltip } from "@arco-design/web-react";
import Col from "@arco-design/web-react/es/Grid/col";
import Row from "@arco-design/web-react/es/Grid/row";
import { useSearchParams } from "react-router-dom";
import ArticleViewer from "../Blog/components/markdown-viewer/ArticleViewer";
import classes from "./BlogDetail.module.scss";

const BlogDetail = () => {
  const [data, setData] = useState({
    content: "",
    title: "",
    time: "",
    type: "",
  });

  const [relatedList, setRelatedList] = useState([]);

  const [search] = useSearchParams();
  const id = search.get("id");

  const getData = async () => {
    const res = await getBlogDetail(id!);
    console.log(res);
    setData(res.data.attributes);
    const result = await getRelatedBlogData(
      res.data.attributes.type.split(","),
      res.data.id
    );
    console.error(result);
    setRelatedList(result.data.slice(0, 5));
  };

  // 跳转页面
  const goToDetail = (id: string) => {
    window.open(`http://localhost:8081/blogDetail?id=${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.detail}>
      <div className={classes.main}>
        <Row justify="space-between">
          <Col span={16} className={classes.content}>
            <header>
              <h1>{data.title}</h1>
              <Space size="large">
                <span className={classes.info}>
                  {dateConversion(data.time)[0]}
                </span>
                {data.type.split(",").map((item) => (
                  <span key={item} className={classes.info}>
                    #{item}
                  </span>
                ))}
              </Space>
            </header>
            <ArticleViewer value={data.content}></ArticleViewer>
          </Col>
          <Col span={7} className={classes.recommendation}>
            <div className={classes.aside}>
              <List
                bordered={false}
                size="small"
                header="相关推荐"
                dataSource={relatedList}
                render={(item: any, index) => (
                  <List.Item key={index}>
                    <Tooltip content={item.title}>
                      <div
                        className={classes.listItem}
                        onClick={() => {
                          goToDetail(item.id);
                        }}
                      >
                        {item.title}
                      </div>
                    </Tooltip>
                  </List.Item>
                )}
              />
              <div></div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BlogDetail;

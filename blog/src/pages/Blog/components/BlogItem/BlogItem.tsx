import React from "react";
import classes from "./BlogItem.module.scss";
import { Button } from "@arco-design/web-react";
import { BlogDataItemType, EditBlogDataType } from "../BlogList/type";
import { IconClose } from "@arco-design/web-react/icon";

const BlogItem = (props: {
  data: BlogDataItemType;
  editBlog: (obj: EditBlogDataType) => void;
  deleteBlog: (id: string) => void;
}) => {
  const { title, type, content, id } = props.data || {};
  const goToDetail = (id: string) => {
    window.open(`http://localhost:8081/blogDetail?id=${id}`);
  };

  const deleteBlog = (e) => {
    e.stopPropagation();
    props.deleteBlog(id)
  };

  const editBlogHandler = (e) => {
    e.stopPropagation();
    props.editBlog(props.data)
  }

  return (
    <div
      className={classes.blogItem}
      onClick={() => {
        goToDetail(id);
      }}
    >
      <h2>{title}</h2>
      <div className={classes.type}>
        {type.split(",").map((item: any, index: number) => (
          <span key={index}>#{item}</span>
        ))}
      </div>
      <p className={classes.content}>{content}</p>
      <IconClose className={classes.closeIcon} onClick={deleteBlog} />
      <Button type="primary" status="warning" className={classes.editBtn} onClick={editBlogHandler}>
        Edit
      </Button>
    </div>
  );
};

export default BlogItem;

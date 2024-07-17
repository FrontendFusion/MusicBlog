import React from "react";
import classes from "./Blog.module.scss";
import BlogList from "./components/BlogList/BlogList";
import CarouselChart from "./components/CarouselChart/CarouselChart";

const Blog = () => {

  return (
    <div className={classes.blog}>
      <div className={classes.header}>
        <CarouselChart></CarouselChart>
      </div>
      <div className={classes.content}>
        <BlogList></BlogList>
      </div>
    </div>
  );
};

export default Blog;

import React from "react";
import classes from "./About.module.scss";

const About = () => {
  return (
    <div className={classes.box}>
      <h2>平台介绍</h2>
      <p>
        本平台是一个集成了音乐播放和博客发布功能的在线系统，旨在为用户提供一个既能记录学习工作中的重点难点，又能享受音乐的个性化空间。系统采用React进行开发，结合了Markdown编辑器和瀑布流式图片墙设计，同时集成了网易云官方音乐接口，提供了一个美观且功能丰富的用户体验，系统主要由
        <strong>
          博客列表页面、图片墙页面、音乐页面、关于页面、博客详情页、个人信息详情页
        </strong>
        等6个页面组成；
      </p>
      <p>主要功能：</p>
      <ul>
        <li>
          &emsp;&emsp;<strong>1、内容创作：</strong>
          通过Markdown语法查看、编辑文章，分享个人见解和生活点滴；
        </li>
        <li>
          &emsp;&emsp;<strong>2、图片墙展示：</strong>
          用户上传图片、以瀑布流的形式展示；
        </li>
        <li>
          &emsp;&emsp;<strong>3、音乐播放：</strong>
          集成网易云音乐API，提供音乐搜索、播放和切换功能，实现博客文章的同时也能享受音乐的乐趣；
        </li>
        <li>
          &emsp;&emsp;<strong>4、个人信息展示：</strong>
          通过用户填写个人信息并呈现；
        </li>
      </ul>
      <p>
        <strong>前端技术栈：</strong>
        <span>
          React、Arco.Design组件库、Axios、Less、Sass、Bytemd/Markdown语法编辑器；
        </span>
      </p>
      <p>
        <strong>后端技术栈：</strong>
        <span>Strapi、Node.js；</span>
      </p>
      <footer>
        <span>© 2024 音乐博客系统</span>
        <span>联系邮箱：1256396490@qq.com</span>
        <span>联系电话：110</span>
        <span>技术支持：蒋磊</span>
        <span>Powered By React</span>
      </footer>
    </div>
  );
};

export default About;

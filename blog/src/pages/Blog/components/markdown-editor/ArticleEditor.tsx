import React, { useState } from "react";
import { Editor } from "@bytemd/react";
import zhHans from "bytemd/locales/zh_Hans.json"; // 引入中文包
import highlight from "@bytemd/plugin-highlight";
import frontmatter from "@bytemd/plugin-frontmatter";
import gfm from "@bytemd/plugin-gfm";
import classes from "./ArticleEditor.module.scss";
import 'bytemd/dist/index.css'
// import 'highlight.js/styles/vs.css'
// import 'highlight.js/styles/monokai-sublime.css';



const plugins = [highlight(), gfm(),frontmatter()];

const Markdown = (props: any) => {
  return (
    <div className={classes.box}>
      <Editor
        locale={zhHans}
        value={props.value}
        plugins={plugins} // markdown中用到的插件，如表格、数学公式、流程图
        onChange={(v) => {
          props.changeValue(v);
        }}
        // uploadImages={async (files) => {
        //   console.log("files", files);
        //   return [
        //     {
        //       title: files.map((i) => i.name),
        //       url: "http",
        //     },
        //   ];
        // }}
      />
    </div>
  );
};

export default Markdown;

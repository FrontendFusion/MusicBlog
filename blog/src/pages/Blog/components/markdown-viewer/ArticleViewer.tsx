import React from "react";
import { Viewer } from "@bytemd/react";
import highlight from "@bytemd/plugin-highlight";
import gfm from "@bytemd/plugin-gfm";
import 'highlight.js/styles/vs.css'
// import 'highlight.js/styles/monokai-sublime.css';
// import "@/assets/css/awesome-green.scss"
// import 'juejin-markdown-themes/dist/juejin.min.css'
import "@/assets/css/mark-down.scss";




const plugins = [highlight(), gfm()];

function Article(props: any) {
    return <Viewer value={props.value} plugins={plugins}></Viewer>;
}

export default Article;

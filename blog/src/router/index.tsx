import React from "react";
import Home from "@/Home";
import About from "@/pages/About/About";
import Music from "@/pages/Music/Music";
import Blog from "@/pages/Blog/Blog";
import BlogDetail from "@/pages/BlogDetail/BlogDetail";
import PictureWall from "@/pages/PictureWall/PictureWall";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import { Navigate } from "react-router-dom";
import Auth from "@/components/Auth/Auth";
import Personal from "@/pages/Personal/Personal";

export const secondaryRoutes = [
  {
    name: "Blog",
    path: "blog",
    element: <Blog></Blog>,
  },
  {
    name: "PictureWall",
    path: "pictureWall",
    element: <PictureWall></PictureWall>,
  },
  {
    name: "Music",
    path: "music",
    element: <Music></Music>,
  },
  {
    name: "About",
    path: "about",
    element: <About></About>,
  },
];

export const routes = [
  {
    path: "/",
    element: <Navigate to="/blog"></Navigate>,
  },
  {
    name: "Home",
    path: "*",
    element: <Home></Home>,
    children: secondaryRoutes.map((item) => ({
      ...item,
      element: <Auth>{item.element}</Auth>,
    })),
  },
  {
    name: "BlogDetail",
    path: "/blogDetail",
    element: (
      <Auth>
        <BlogDetail></BlogDetail>
      </Auth>
    ),
  },
  {
    name: "Personal",
    path: "/personal",
    element: (
      <Auth>
        <Personal></Personal>
      </Auth>
    ),
  },
  {
    name: "Login",
    path: "/login",
    element: <Login></Login>, // 这里可以写登录组件
  },
  {
    name: "Register",
    path: "/Register",
    element: <Register></Register>, // 这里可以写登录组件
  },
];

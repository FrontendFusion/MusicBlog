import React  from "react";
// import "@arco-design/web-react/dist/css/arco.css";
import "@/assets/css/common.scss";
import "./App.scss";
import { Layout } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";
import MyMenu from "./components/MyMenu";
import Audio from "@/components/Audio";

const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const Home = () => {
  return (
      <Audio>
        <Layout>
          <Header>
            <MyMenu></MyMenu>
          </Header>
          <div className="box">
            <Content>
              <Outlet></Outlet>
            </Content>
            {/* <Footer>footer</Footer> */}
          </div>
        </Layout>
      </Audio>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Form,
} from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import sty from "./adminIndex.module.css";
import { UserOutlined, ProjectOutlined } from "@ant-design/icons";
import Users from "./users";
import Msgs from "./msgs";

const { Header, Content, Sider } = Layout;

export default (props) => {
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [navItems, setNavItems] = useState([
    {
      label: "用户管理",
      key: "/admin/user",
      icon: React.createElement(UserOutlined),
    },
    {
      label: "留言管理",
      key: "/admin/msg",
      icon: React.createElement(ProjectOutlined),
    },
  ]);
  const [form2] = Form.useForm();

  useEffect(() => {
    if (window.sessionStorage.userinfo) {
      let uinfo = JSON.parse(window.sessionStorage.userinfo);
      setUserinfo(uinfo);
    } else {
      props.history.push("/login");
    }
  }, []);
  return (
    <Layout>
    

      <Layout>
        <Sider width={250} className={sty.background}>
          <Menu
            mode="inline"
            onClick={(item) => {
              props.history.push(item.key);
            }}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={navItems}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <div
            style={{
              height: 10,
            }}
          />
          <Content
            className={sty.background}
            style={{
              padding: 24,
              margin: 0,
              minHeight: 600,
            }}
          >
            <Switch>
              <Route path="/admin/user" component={Users} />
              <Route path="/admin/msg" component={Msgs} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

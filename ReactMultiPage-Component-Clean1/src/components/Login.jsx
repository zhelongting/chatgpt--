import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import sty from "./login.module.css";

function Login(props) {
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(true);

  const onFinish = (values) => {
    if (isLogin) {
      let { username, pwd } = values;
      axios({
        url: "http://localhost:5000/login",
        method: "post",
        data: {
          username,
          pwd,
        },
      }).then((res) => {
        console.log("res = ", res);
        if (res.data.code == -1) {
          message.error(res.data.msg);
        } else {
          let userinfo = res.data.data;
          message.success(res.data.msg);
          window.sessionStorage.userinfo = JSON.stringify(userinfo);
          // 跳转管理员首页
          if (userinfo.role == "admin") {
            props.history.push('/admin/user')
          } else {
            //   跳转用户首页
            props.history.push('/')
          }
        }
      });
    } else {
      // 注册处理
      let { username, pwd } = values;
      axios({
        url: "http://localhost:5000/register",
        method: "post",
        data: {
          username,
          pwd,
          role: "user",
        },
      }).then((res) => {
        console.log("res = ", res);
        if (res.data.code == -1) {
          message.error(res.data.msg);
        } else {
          message.success(res.data.msg);
          setIsLogin(true);
        }
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={sty.box}>
      <div className={sty.loginBox}>
        <h1 className={sty.h1}>{isLogin ? "登录" : "注册"}</h1>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入您的用户名!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="pwd"
            label="密码"
            rules={[
              {
                required: true,
                message: "请输入您的密码!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <div
            style={{
              textAlign: "center",
            }}
          >
            {" "}
            <Button
              style={{
                width: "50%",
              }}
              type="primary"
              htmlType="submit"
            >
              {isLogin ? "登录" : "注册"}
            </Button>
          </div>
        </Form>
        <div
          style={{
            textAlign: "right",
            marginTop: 30,
          }}
        >
          <Button
            onClick={() => {
              if (isLogin == false) {
                form.resetFields();
              }
              setIsLogin(!isLogin);
            }}
            type="link"
          >
            {isLogin ? "还没账号？去注册" : "已有账号, 去登陆"}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Login);
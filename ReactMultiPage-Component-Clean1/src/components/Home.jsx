import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./css/index.css";
import axios from "axios";
import { message } from "antd";
import home_lunbo1 from "./images/home_lunbo1.png";
import home_lunbo2 from "./images/home_lunbo2.png";
import home_lunbo3 from "./images/home_lunbo3.jpg";
import home_lunbo4 from "./images/home_lunbo4.png";

import chanpin1 from "./images/chanpin1.png";
import chanpin2 from "./images/chanpin2.jpg";
import chanpin3 from "./images/chanpin3.jpg";
import shiyanshi1 from "./images/shiyanshi1.png";
import shiyanshi2 from "./images/shiyanshi2.png";
import shiyanshi3 from "./images/shiyanshi3.png";
import cruzr from "./images/cruzr.png";
import microbit from "./images/microbit.jpg";
import NAO from "./images/NAO.jpg";
import huodong1 from "./images/huodong1.jpg";
import huodong2 from "./images/huodong2.png";
import huodong3 from "./images/huodong3.jpg";
import huodong4 from "./images/huodong4.jpg";
import introImage from "./images/Intro.webp";


import ji from "./images/ji.png";

import {
  Row,
  Col,
  Stack,
  Form,
  Button,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
  Card,
  Carousel,
} from "react-bootstrap";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      content: "",
      userinfo: null,
    };
  }

  componentDidMount() {
    if (window.sessionStorage.userinfo) {
      this.setState({
        userinfo: JSON.parse(window.sessionStorage.userinfo),
      });
    }
  }

  render() {
    const { email, content, userinfo } = this.state;
    return (
      <div className="home">
        <div class="container">
            <div class="row align-items-center my-5">
              <div class="col-lg-7">
                <img
                    class="img-fluid rounded mb-4 mb-lg-0"
                    src={introImage}
                    alt=""
                />
              </div>
              <div class="col-lg-5">
                <h1 class="font-weight-light">ChatGPT介绍</h1>
                <p>
                  ChatGPT是人工智能技术驱动的自然语言处理工具，它能够通过学习和理解人类的语言来进行对话，还能根据聊天的上下文进行互动，真正像人类一样来聊天交流，甚至能完成撰写邮件、视频脚本、文案、翻译、代码，写论文等任务。
                </p>
              </div>
            </div>
          </div>
        
        <h3 style={{ textAlign: "center" }}>留言</h3>
        <Form className="liuyan">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>邮箱地址</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => {
                this.setState({
                  email: e.target.value,
                });
              }}
              type="email"
              placeholder="请输入您的邮箱"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>您的留言</Form.Label>
            <Form.Control
              value={content}
              onChange={(e) => {
                this.setState({
                  content: e.target.value,
                });
              }}
              as="textarea"
              rows={3}
            />
          </Form.Group>

          <Button
            onClick={() => {
              console.log("email = ", email);
              console.log("content = ", content);
              if (!userinfo) {
                message.error("请先登录！");
                return;
              }
              axios({
                url: "http://localhost:5000/public",
                method: "post",
                data: {
                  username: userinfo.username,
                  email,
                  content,
                },
              }).then((res) => {
                console.log("res = ", res);
                if (res.data.code == -1) {
                  message.error(res.data.msg);
                } else {
                  message.success(res.data.msg);
                  this.setState({
                    email: '',
                    content: ''
                  })
                }
              });
            }}
            variant="primary"
            // type="submit"
          >
            Submit
          </Button>
        </Form>
        <br />
        <br />
        <div className="footerBottom">
          <br />
          <p className="reserved" style={{ textAlign: "center" }}>
            2012-2022 Ubtech Robotics Corp. All rights reserved
          </p>
        </div>
      </div>
    );
  }
}

export default Home;

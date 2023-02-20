import React, { useState, useEffect } from "react";
import {
  message,
  Form,
  Input,
  Button,
  Table,
  Breadcrumb,
  Space,
  Modal,
  Select,
  Popconfirm,
  Tag,
} from "antd";
import sty from "./msgs.module.css";
import axios from "axios";
import moment from "moment";


export default function Com() {
  const [source, setSource] = useState({ data: [] });
  const getData = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/findAll",
    }).then((res) => {
      console.log("res = ", res);
      setSource({
        data: res.data.data,
      });
    });
  };

  const remove = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:5000/deleteMsg/${id}`,
    }).then((res) => {
      getData();
      message.success("删除成功！");
    });
  };

  const columns = [
    {
      title: "留言人",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "留言邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "留言内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render(text, t) {
        return moment(t.createTime).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render(text, t) {
        return (
          <Space>
            <Popconfirm
              title="确认删除?"
              onConfirm={() => remove(t.id)}
              okText="是"
              cancelText="否"
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  useEffect(
    () => {
      getData();
    },
    []
  );

  return (
    <div className={sty.container}>
      <Breadcrumb
        style={{
          marginBottom: 30,
        }}
        separator=">"
      >
        <Breadcrumb.Item>管理员</Breadcrumb.Item>
        <Breadcrumb.Item>留言管理</Breadcrumb.Item>
      </Breadcrumb>

      <Table
        columns={columns}
        rowKey={(v) => {
          return v.id;
        }}
        pagination={false}
        dataSource={source.data}
      />
    </div>
  );
}

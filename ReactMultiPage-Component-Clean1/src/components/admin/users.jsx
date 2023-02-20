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
import sty from "./users.module.css";
import axios from "axios";
import moment from "moment";

const { Option } = Select;
export default function Com() {
  const [form] = Form.useForm();
  const [modelForm] = Form.useForm();
  const [query, setQuery] = useState({
    username: "",
  });
  const [source, setSource] = useState({ data: [] });
  const [currentItem, setCurrentItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOperation, setCurrentOperation] = useState("ADD");

  const OPERATION_MAP_TEXT = {
    ADD: "Create User",
    EDIT: "Edit User",
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    modelForm.submit();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getData = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/findAllUsers",
      params: query,
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
      url: `http://localhost:5000/deleteUser/${id}`,
    }).then((res) => {
      getData();
      message.success("删除成功！");
    });
  };

  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (text, record) => {
        if (record.role == "admin") {
          return <Tag color="#87d068">管理员</Tag>;
        }
        if (record.role == "user") {
          return <Tag color="#108ee9">普通用户</Tag>;
        }
      },
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
            <Button
              disabled={t.role == "s"}
              onClick={() => {
                setIsModalVisible(true);
                setCurrentOperation("EDIT");
                setCurrentItem(t);
                let { username, role, pwd } = t;
                setTimeout(() => {
                  modelForm.setFieldsValue({
                    username,
                    role,
                    pwd,
                  });
                }, 500);
              }}
              type="primary"
            >
              编辑
            </Button>
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
    [query]
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
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      </Breadcrumb>

      <Modal
        width={800}
        title={OPERATION_MAP_TEXT[currentOperation]}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="modelForm"
          form={modelForm}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          autoComplete="off"
          onFinish={(v) => {
            // console.log("v = ", v)
            let { username, pwd, role } = v;
            if (currentOperation == "ADD") {
              axios({
                method: "post",
                url: "http://localhost:5000/register",
                data: v,
              }).then((res) => {
                if (res.data.code == -1) {
                  message.error(res.data.msg);
                } else {
                  message.success("新增成功!");
                  getData();
                  setIsModalVisible(false);
                }
              });
            } else {
              axios({
                method: "put",
                url: `http://localhost:5000/updateUser/${currentItem.id}`,
                data: {
                  username,
                  pwd,
                  role,
                },
              }).then((res) => {
                message.success("更新成功!");
                getData();
                setIsModalVisible(false);
              });
            }
          }}
          onFinishFailed={() => {}}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: "请选择账户角色!" }]}
          >
            <Select placeholder="请选择账户角色" style={{ width: "100%" }}>
              <Option value="user">普通用户</Option>
              <Option value="admin">管理员</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="pwd"
            label="密码"
            rules={[
              {
                required: currentOperation == "ADD" ? true : false,
                message: "请输入密码!",
              },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        </Form>
      </Modal>

      <div className={sty.functionalDomain}>
        <Button
          type="primary"
          onClick={() => {
            showModal();
            setCurrentOperation("ADD");
            setTimeout(() => {
              modelForm.resetFields();
            }, 200);
          }}
        >
          新增用户
        </Button>
      </div>

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

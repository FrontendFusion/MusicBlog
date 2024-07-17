import { register, registerUserInfo } from "@/request/request";
import { Button, Form, Input, Message, Space } from "@arco-design/web-react";
import FormItem from "@arco-design/web-react/es/Form/form-item";
import Row from "@arco-design/web-react/es/Grid/row";
import { IconUser } from "@arco-design/web-react/icon";
import React, { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Register.module.scss";

const Login = () => {
  const [form] = Form.useForm();

  const nav = useNavigate();

  const onSubmithandler = async (e: any) => {
    console.log("e", e);
    const regInfo = {
      username: e.username,
      email: e.email,
      password: e.password,
      userId: Date.now() + "",
    };
    try {
      const res: any = await register(regInfo);
      console.log("res", res);
      if (res.jwt) {
        const personInfo = {
          userId: res.user.userId,
          username: res.user.username,
          email: res.user.email,
        };
        const result = await registerUserInfo({data: personInfo});
        console.log("result", result);
        localStorage.setItem("token", res.jwt);
        localStorage.setItem("userId", res.user.userId);
        nav("/blog")
      }
    } catch (error: any) {
      console.log("error", error);
      Message.error(error?.error?.message);
    }
  };

  return (
    <div className={classes.box}>
      <Form
        form={form}
        className={classes.form}
        wrapperCol={{ span: 24 }}
        onSubmit={onSubmithandler}
      >
        <h2>Register</h2>
        <Space direction="vertical">
          <label>UserName</label>
          <FormItem
            field="username"
            tooltip={<div>Username is required </div>}
            rules={[
              {
                validateTrigger: "onBlur",
                validator(value, callback) {
                  if (!value) {
                    callback("The Username is required");
                  } else if (value.length < 3) {
                    callback("The Username Cannot Be Less Than 3 Characters");
                  } else {
                    callback();
                  }
                },
              },
            ]}
          >
            <Input
              prefix={<IconUser style={{ strokeWidth: 2.5, fontSize: 24 }} />}
              className={classes.input}
              placeholder="Enter your UserName"
              allowClear
            />
          </FormItem>
        </Space>
        <Space direction="vertical">
          <label>Email</label>
          <FormItem
            field="email"
            tooltip={<div>Email is required </div>}
            rules={[
              {
                validateTrigger: "onBlur",
                validator(value, callback) {
                  if (!value) {
                    callback("The Email is required");
                  } else if (value.length < 3) {
                    callback("The Email Cannot Be Less Than 6 Characters");
                  } else {
                    callback();
                  }
                },
              },
            ]}
          >
            <Input
              prefix={
                <svg
                  height="20"
                  viewBox="0 0 32 32"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Layer_3" data-name="Layer 3">
                    <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                  </g>
                </svg>
              }
              className={classes.input}
              placeholder="Enter your Email"
              allowClear
            />
          </FormItem>
        </Space>
        <Space direction="vertical">
          <label>Password</label>
          <FormItem
            field="password"
            tooltip={<div>Password is required </div>}
            rules={[
              {
                validateTrigger: "onBlur",
                validator(value, callback) {
                  if (!value) {
                    callback("The Password is required");
                  } else if (value.length < 3) {
                    callback("The Password Cannot Be Less Than 6 Characters");
                  } else {
                    callback();
                  }
                },
              },
            ]}
          >
            <Input
              prefix={
                <svg
                  height="20"
                  viewBox="-64 0 512 512"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                  <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                </svg>
              }
              className={classes.input}
              placeholder="Enter your Password"
              allowClear
            />
          </FormItem>
        </Space>
        <FormItem>
          <Row justify="center">
            <Button
              type="primary"
              className={classes.button_submit}
              htmlType="submit"
            >
              Sign Up
            </Button>
          </Row>
        </FormItem>
        <p className={classes.p}>
          Existing Account?{" "}
          <span
            className={classes.span}
            onClick={() => {
              nav("/login");
            }}
          >
            Click To Sign In
          </span>
        </p>
      </Form>
    </div>
  );
};

export default Login;

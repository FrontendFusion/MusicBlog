import {
  Button,
  DatePicker,
  Form,
  Input,
  Message,
  Modal,
  Radio,
  Select,
  Space,
  Tabs,
  Typography,
} from "@arco-design/web-react";
import FormItem from "@arco-design/web-react/es/Form/form-item";
import classes from "./Personal.module.scss";
import React, { useEffect, useState } from "react";
import TabPane from "@arco-design/web-react/es/Tabs/tab-pane";
import { IconSubscribed, IconTag, IconUser } from "@arco-design/web-react/icon";
import { getUserInfoById, updateUserInfo } from "@/request/request";
import Row from "@arco-design/web-react/es/Grid/row";

const options = [
  "博士后",
  "博士",
  "MBA",
  "硕士",
  "本科",
  "大专",
  "中专",
  "高中",
  "初中",
  "小学",
];
const options2 = [
  "金融",
  "教育",
  "电商",
  "传媒",
  "游戏",
  "医疗",
  "化工",
  "建筑",
  "机械",
  "能源",
  "交通",
  "物流",
  "政府",
  "其他",
];
const id = localStorage.getItem("id");

const Personal = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<any>({});
  const [form] = Form.useForm();

  //  获取个人信息
  const getPersonalInfo = async () => {
    try {
      const res = await getUserInfoById(id!);
      console.log(res);
      //   setInfo(res.data[0].attributes);
      if (!res.data.attributes.industry) {
        res.data.attributes.industry = undefined;
      }
      if (!res.data.attributes.educational) {
        res.data.attributes.educational = undefined;
      }
      form.setFieldsValue(res.data.attributes);
      setPersonalInfo(res.data.attributes);
    } catch (error) {
      console.error(error);
    }
  };

  //  修改个人信息
  const updatePersonalInfo = async () => {
    const info = form.getFieldsValue();
    try {
      const res = await updateUserInfo(id!, { data: info });
      setPersonalInfo(res.data.attributes);
      Message.success("Modified Successfully");
      setIsEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  //   取消
  const cancel = () => {
    Modal.confirm({
      title: "tips",
      content:
        "After Cancellation The Content Will Be Reset. Are You Sure To Cancel?",
      onOk: () => {
        form.setFieldsValue(personalInfo);
        setIsEdit(false);
      },
    });
  };

  useEffect(() => {
    getPersonalInfo();
  }, []);

  return (
    <div className={classes.box}>
      <div className={classes.content}>
        <Tabs defaultActiveTab="1" direction="vertical" className={classes.tbs}>
          <TabPane
            key="1"
            title={
              <span>
                <IconUser style={{ marginRight: "5px", fontSize: 14 }} />
                Personal Info
              </span>
            }
          >
            <Typography.Paragraph>
              <Form
                form={form}
                className={classes.form}
                autoComplete="off"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                disabled={!isEdit}
                onSubmit={updatePersonalInfo}
              >
                <h2>Personal Information</h2>
                <FormItem label="Username：" field="username">
                  <Input
                    placeholder="Please Enter Your Username"
                    className={classes.input}
                    disabled
                  />
                </FormItem>
                <FormItem label="Sex：" field="sex">
                  <Radio.Group>
                    <Radio value="男">男</Radio>
                    <Radio value="女">女</Radio>
                  </Radio.Group>
                </FormItem>
                <FormItem label="Age：" field="age">
                  <Input
                    placeholder="Please Enter Your Age"
                    className={classes.input}
                  />
                </FormItem>
                <FormItem label="Email：" field="email">
                  <Input
                    placeholder="Please Enter Your Email"
                    className={classes.input}
                    disabled
                  />
                </FormItem>
                <FormItem label="Phone：" field="phone">
                  <Input
                    placeholder="Please Enter Your Phone Number"
                    className={classes.input}
                  />
                </FormItem>
                <FormItem label="Address：" field="address">
                  <Input
                    placeholder="Please Enter Your Address"
                    className={classes.input}
                  />
                </FormItem>
                {/* <FormItem wrapperCol={{ span: 19 }}>
                  <Row justify="center">
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!isEdit1}
                      >
                        Submit
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setIsEdit1((pre) => !pre)}
                      >
                        {isEdit1 ? "Cancel" : "Edit"}
                      </Button>
                    </Space>
                  </Row>
                </FormItem> */}
              </Form>
            </Typography.Paragraph>
          </TabPane>
          <TabPane
            key="2"
            title={
              <span>
                <IconTag style={{ marginRight: "5px", fontSize: 14 }} />
                Education Info
              </span>
            }
          >
            <Typography.Paragraph>
              <Form
                form={form}
                className={classes.form}
                autoComplete="off"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                disabled={!isEdit}
              >
                <h2>Education Information</h2>
                <FormItem label="SchoolName：" field="schoolname">
                  <Input
                    placeholder="Please Enter The Name Of  The School"
                    className={classes.input}
                  />
                </FormItem>
                <FormItem label="Major：" field="major">
                  <Input
                    placeholder="Please Enter The Major"
                    className={classes.input}
                  />
                </FormItem>
                <FormItem label="Enrollment Time：" field="enrollmentTime">
                  <DatePicker
                    placeholder="Please Select The Enrollment Time"
                    className={classes.input}
                  />
                </FormItem>
                <FormItem label="Graduation Time：" field="graduationTime">
                  <DatePicker
                    placeholder="Please Select The Graduation Time"
                    className={classes.input}
                  />
                </FormItem>
                <FormItem label="Educational BG：" field="educational">
                  <Select
                    className={classes.select}
                    placeholder="Please Select Your Educational Background"
                    options={options}
                    allowClear
                  ></Select>
                </FormItem>
                {/* <FormItem wrapperCol={{ span: 19 }}>
                  <Row justify="center">
                    <Space>
                      <Button type="primary">Submit</Button>
                      <Button type="primary" onClick={() => setIsEdit2(true)}>
                        Edit
                      </Button>
                    </Space>
                  </Row>
                </FormItem> */}
              </Form>
            </Typography.Paragraph>
          </TabPane>
          <TabPane
            key="3"
            title={
              <span>
                <IconSubscribed style={{ marginRight: "5px", fontSize: 14 }} />
                Work Info
              </span>
            }
          >
            <Typography.Paragraph>
              <Form
                form={form}
                className={classes.form}
                autoComplete="off"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                disabled={!isEdit}
              >
                <h2>Work Information</h2>
                <FormItem label="Corporate Name：" field="corporateName">
                  <Input
                    placeholder="Please Enter The Company Name"
                    className={classes.input}
                  />
                </FormItem>
                <FormItem label="Position Name：" field="positionName">
                  <Input
                    placeholder="Please Enter The Position Name"
                    className={classes.input}
                  />
                </FormItem>
                <FormItem label="Industry：" field="industry">
                  <Select
                    className={classes.select}
                    placeholder="Please Enter Your Industry"
                    options={options2}
                    allowClear
                  ></Select>
                </FormItem>
                {/* <FormItem wrapperCol={{ span: 19 }}>
                  <Row justify="center">
                    <Space>
                      <Button type="primary">Submit</Button>
                      <Button type="primary" onClick={() => setIsEdit3(true)}>
                        Edit
                      </Button>
                    </Space>
                  </Row>
                </FormItem> */}
              </Form>
            </Typography.Paragraph>
          </TabPane>
        </Tabs>
        <Row justify="center">
          <Space>
            <Button
              type="primary"
              onClick={updatePersonalInfo}
              disabled={!isEdit}
            >
              Submit
            </Button>
            {isEdit ? (
              <Button type="primary" onClick={cancel}>
                Cancel
              </Button>
            ) : (
              <Button type="primary" onClick={() => setIsEdit(true)}>
                Edit
              </Button>
            )}
          </Space>
        </Row>
      </div>
    </div>
  );
};

export default Personal;

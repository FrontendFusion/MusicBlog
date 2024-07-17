import {
  getPictureWallData,
  uploadPicture,
  uploadPictureToMediaLibrary,
} from "@/request/request";
import React, { useEffect, useState } from "react";
import ViewWindow from "./components/ViewWindow";
import { throttle } from "@/utils";
import classes from "./PictureWall.module.scss";
import {
  Button,
  Form,
  Input,
  Message,
  Modal,
  Upload,
} from "@arco-design/web-react";
import FormItem from "@arco-design/web-react/es/Form/form-item";
import Loading from "@/components/loading/Loading";

const TextArea = Input.TextArea;

const PictureWall = () => {
  const [dataList, setDataList] = useState<any[]>([]);
  const [visible, setVisible] = useState(false); // 上传图片弹窗
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const getDataList = throttle(() => {
    getPictureWallData()
      .then((res) => {
        let list = res.data.map((item: any) => {
          return {
            des: item.attributes.des,
            picInfo: {
              width: item.attributes.pic.data.attributes.width,
              height: item.attributes.pic.data.attributes.height,
              url: item.attributes.pic.data.attributes.url,
            },
          };
        });
        // for (let index = 0; index < 3; index++) {
        //   list = list.concat(list);
        // }
        // setDataList([...dataList, ...list]);
        setDataList(list);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 500);

  const submit = async () => {
    try {
      const values = await form.validate();
      const file = values.upload[0].originFile;
      const formData = new FormData();
      formData.append("files", file as Blob);
      const res: any = await uploadPictureToMediaLibrary(formData);
      if (res.length) {
        const id = res[0].id;
        const res2 = await uploadPicture({
          data: { des: values.des, pic: id },
        });
        res2.data && Message.success("Upload Successfully") && getDataList();
      }
      setVisible(false);
      getDataList();
      console.error(values);
      form.resetFields();
    } catch (error: any) {
      console.log(error.name);
      console.log(error.message);
      console.log(error.errors);
      console.log(error);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <div className={classes.pictureWall}>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <header className={classes.header}>
            <h4>Here You Will Be Able To Browse Or Upload Images</h4>
            <Button type="primary" onClick={() => setVisible(true)}>
              Click To Upload
            </Button>
          </header>
          <ViewWindow
            columnWidth={300}
            rowGap={10}
            colGap={10}
            data={dataList}
            getDataList={getDataList}
          ></ViewWindow>
          <Modal
            title="Upload Images"
            visible={visible}
            onOk={() => submit()}
            onCancel={() => {
              setVisible(false);
              form.resetFields();
            }}
            unmountOnExit={true}
          >
            <Form
              form={form}
              className={classes.form}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
            >
              <FormItem
                label="Describe："
                rules={[
                  {
                    required: true,
                    validator(value, callback) {
                      if (!value) {
                        callback("Please Enter The Description");
                      } else if (value.length > 200) {
                        callback(
                          "The Description Content Cannot Exceed 200 Characters"
                        );
                      } else {
                        callback();
                      }
                    },
                  },
                ]}
                field="des"
              >
                <TextArea
                  placeholder="please enter..."
                  autoSize
                  maxLength={200}
                />
              </FormItem>
              <FormItem
                label="Upload："
                rules={[
                  {
                    required: true,
                    validator(value, callback) {
                      if (!value) {
                        callback("Please Upload Pictures");
                      } else {
                        callback();
                      }
                    },
                  },
                ]}
                field="upload"
              >
                <Upload
                  limit={1}
                  autoUpload={false}
                  imagePreview
                  headers={{ "Content-Type": "multipart/form-data" }}
                  listType="picture-card"
                  style={{ height: "88px" }}
                />
              </FormItem>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default PictureWall;

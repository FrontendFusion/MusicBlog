import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Timeline,
  Grid,
  Pagination,
  PageHeader,
  Radio,
  Button,
  Modal,
  Transfer,
  Message,
  Input,
} from "@arco-design/web-react";
import BlogItem from "../BlogItem/BlogItem";
import classes from "./BlogList.module.scss";
import {
  addBlogData,
  deleteBlogData,
  editBlogData,
  getBlogData,
  queryBlogData,
} from "@/request/request";
import { BlogListType, EditBlogDataType } from "./type";
import { dateConversion } from "@/utils";
import ArticleEditor from "../markdown-editor/ArticleEditor";
import { TransferItem } from "@arco-design/web-react/es/Transfer/interface";
import { IconCommand, IconSearch } from "@arco-design/web-react/icon";
import LoadingContext from "@/context/LoadingContext";
const TimelineItem = Timeline.Item;
const { Row } = Grid;

function itemRender(
  page: number,
  type: "page" | "more" | "prev" | "next",
  originElement: React.ReactNode
) {
  if (type === "prev") {
    return <a style={{ fontSize: 14, margin: "0 8px" }}>Prev</a>;
  }

  if (type === "next") {
    return <a style={{ fontSize: 14, margin: "0 8px" }}>Next</a>;
  }

  return originElement;
}

const dataSource = [
  {
    key: "frontEnd",
    value: "前端",
  },
  {
    key: "backEnd",
    value: "后端",
  },
  {
    key: "Javascript",
    value: "Javascript",
  },
  {
    key: "HTML",
    value: "HTML",
  },
  {
    key: "CSS",
    value: "CSS",
  },
  {
    key: "Vue",
    value: "Vue",
  },
  {
    key: "React",
    value: "React",
  },
  {
    key: "Uni-app",
    value: "Uni-app",
  },
];

const BlogList = () => {
  const [blogData, setBlogData] = useState<BlogListType>({
    list: [],
    total: 0,
  }); // 数据列表
  const listBox = useRef<HTMLDivElement>(null);
  const [showEdit, setShowEdit] = useState(false); // 发布博客弹窗
  const [isEdit, setIsEdit] = useState(false); // 是否是编辑
  const [showSelectType, setShowSelectType] = useState(false); // 选择分类弹窗
  const [blogValue, setBlogValue] = useState({
    title: "",
    content: "",
    type: "",
    id: "",
  });

  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [searchList, setSearchList] = useState<any[]>([]);

  const { changeLoading } = useContext(LoadingContext);

  const defaultTargetKeys = () => {
    let curTargetKeysArr: string[] = [];
    if (blogValue.type) {
      const curTargetKeys = blogValue.type.split(",");
      Outer: for (const key of curTargetKeys) {
        for (const keyObj of dataSource) {
          if (key == keyObj.value) {
            curTargetKeysArr.push(keyObj.key);
            continue Outer;
          }
        }
      }
    }
    return curTargetKeysArr;
  };
  // 切换页数回调
  const onPageChange = (current: number, pageSize: number) => {
    getDataList(current, pageSize);
    listBox.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 请求数据
  const getDataList = async (current = 1, pageSize = 10) => {
    try {
      const res: any = await getBlogData({ current, pageSize });
      setBlogData({ list: res.data, total: res.pagination.total });
    } catch (error) {
      console.error(error);
    } finally {
      changeLoading(false);
    }
  };

  // 处理时间
  function processData(date: string) {
    return (
      <>
        <span>{dateConversion(date)[1]}</span>
        <span>{dateConversion(date)[0]}</span>
      </>
    );
  }

  // 搜索算法
  const filterOption = (inputValue: string, item: TransferItem): boolean => {
    return (
      item.value.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) >
      -1
    );
  };

  // 选择分类
  const handleSelectType = (newTargetKeys: string[]) => {
    let select: string[] = [];
    newTargetKeys.forEach((item) => {
      dataSource.forEach((item2) => {
        if (item === item2.key) {
          select.push(item2.value);
        }
      });
    });
    setBlogValue({ ...blogValue, type: select.join(",") });
  };

  // 关闭弹窗
  const handleClose = () => {
    if (!blogValue.content.length) {
      setShowEdit(false);
      setIsEdit(false);
      return;
    }
    Modal.confirm({
      title: "Tips",
      content:
        "After cancellation the content will be cleared. Are you sure you want to cancel?",
      okButtonProps: {
        status: "danger",
      },
      onOk: () => {
        setBlogValue({ title: "", content: "", type: "", id: "" });
        setShowEdit(false);
        setIsEdit(false);
      },
    });
  };

  // 提交博客
  const handleSubmit = async () => {
    const data = {
      title: blogValue.title,
      content: blogValue.content,
      type: blogValue.type,
      time: Date.now() || undefined,
    };
    if (!isEdit) {
      await addBlogData({ data });
    } else {
      delete data.time;
      await editBlogData(blogValue.id, { data });
      setIsEdit(false);
    }
    setShowSelectType(false);
    setShowEdit(false);
    Message.success("Submitted successfully");
    getDataList();
    setBlogValue({ title: "", content: "", type: "", id: "" });
  };

  // 搜索博客
  const searchHandler = async (value: string) => {
    console.log("e", value);
    // 正则表达式去空格
    const reg = /^\s*$/;
    if (reg.test(value)) {
      setSearchList([]);
      return;
    }
    try {
      const res = await queryBlogData(value);
      console.log(res);
      setSearchList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 跳转详情页
  const goToDetail = (id: string) => {
    window.open(`http://localhost:8081/blogDetail?id=${id}`);
  };

  // 编辑博客
  const editBlog = (obj: EditBlogDataType) => {
    setBlogValue({
      title: obj.title,
      content: obj.content,
      type: obj.type,
      id: obj.id,
    });
    setIsEdit(true);
    setShowEdit(true);
  };

  // 删除博客
  const deleteBlog = (id: string) => {
    Modal.confirm({
      title: "Tips",
      content:
        "After Deletion It Cannot Be Restored. Are You Sure You Want To Delete It?",
      okButtonProps: {
        status: "danger",
      },
      onOk: async () => {
        await deleteBlogData(id);
        Message.success({
          content: "Delete Successfully",
          duration: 1000,
        });
        getDataList();
      },
    });
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <>
      <div className={classes.blogList} ref={listBox}>
        <PageHeader
          className={classes.pageHeader}
          title="All blogs"
          subTitle={
            <div className={classes.searchBox}>
              <p>Welcome to click to view</p>
              <IconSearch
                onClick={() => {
                  setSearchVisible(true);
                }}
                className={classes.icon}
              />
            </div>
          }
          extra={
            <div>
              <Button
                className={classes.sendArticle}
                type="primary"
                onClick={() => {
                  setShowEdit(true);
                }}
              >
                Send
              </Button>
            </div>
          }
        />
        <Timeline mode="top" labelPosition="relative">
          {blogData.list.map((item, index) => (
            <TimelineItem
              label={processData(item.time)}
              dotType={"hollow"}
              key={index}
            >
              <Row>
                <BlogItem
                  data={item}
                  editBlog={editBlog}
                  deleteBlog={deleteBlog}
                ></BlogItem>
              </Row>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      {!!blogData.total && (
        <div className={classes.pagination}>
          <Pagination
            total={blogData.total}
            itemRender={itemRender}
            pageSize={10}
            onChange={onPageChange}
            showTotal
            simple
          />
        </div>
      )}
      <Modal
        title={
          <Input
            style={{ width: 350 }}
            allowClear
            placeholder="请输入文章标题"
            value={blogValue.title}
            onChange={(value) => {
              setBlogValue({ ...blogValue, title: value });
            }}
          />
        }
        visible={showEdit}
        style={{
          width: "95%",
        }}
        unmountOnExit={true}
        onOk={() => {
          if (!blogValue.title.length || !blogValue.content.length) {
            Message.warning("Please enter the title and content");
            return;
          }
          setShowSelectType(true);
        }}
        onCancel={handleClose}
        cancelText="Cancel"
        okText="Confirm"
      >
        <ArticleEditor
          value={blogValue.content}
          changeValue={(value: string) => {
            setBlogValue({ ...blogValue, content: value });
          }}
        ></ArticleEditor>
      </Modal>
      <Modal
        title="Please Select The Article Type"
        visible={showSelectType}
        onCancel={() => {
          setShowSelectType(false);
        }}
        onOk={handleSubmit}
        unmountOnExit={true}
        okText="Confirm Release"
        cancelText="Cancel"
      >
        <Transfer
          showSearch
          defaultTargetKeys={defaultTargetKeys()}
          dataSource={dataSource}
          searchPlaceholder="Please select"
          titleTexts={["To-do list", "Selected list"]}
          filterOption={filterOption}
          onChange={handleSelectType}
        />
      </Modal>
      <Modal
        alignCenter={false}
        visible={searchVisible}
        footer={null}
        escToExit={true}
        closable={false}
        onCancel={() => {
          setSearchVisible(false);
          setSearchList([]);
        }}
        className={classes.searchModal}
        unmountOnExit={true}
      >
        <div className={classes.box}>
          <div className={classes.header}>
            <Input
              placeholder="Search"
              className={classes.search}
              style={{ width: "70%" }}
              onChange={searchHandler}
              prefix={<IconSearch className={classes.searchIcon} />}
              allowClear
            />
            <div className={classes.quit}>
              <span>退出</span>
              <span className={classes.text}>ESC</span>
            </div>
          </div>
          <div className={classes.searchContent}>
            <ul>
              {searchList.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    goToDetail(item.id);
                  }}
                >
                  <svg viewBox="0 0 24 54" className={classes.icon}>
                    <path
                      d="M8 6v42m12-21H8.3"
                      stroke="currentColor"
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3px"
                    ></path>
                  </svg>
                  <IconCommand className={classes.icon} />
                  <p>{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BlogList;

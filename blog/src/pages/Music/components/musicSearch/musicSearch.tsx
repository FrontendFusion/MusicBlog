import React, { useEffect, useState } from "react";
import classes from "./musicSearch.module.scss";
import { Input } from "@arco-design/web-react";
import { getHotSearchList, search } from "@/request/musicRequest";
import MusicList from "../MusicList/MusicList";
const InputSearch = Input.Search;

const musicSearch = () => {
  const [hotList, setHotList] = useState<any[]>([]);
  const [searchList, setSearchList] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const getHotList = async () => {
    try {
      const res: any = await getHotSearchList();
      setHotList(res.result.hots.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (value: string) => {
    console.log("e", value);
    // 正则表达式去空格
    const reg = /^\s*$/;
    if (reg.test(value)) {
      setSearchList([]);
      return;
    }
    try {
      // 请求搜索数据
      const res: any = await search(value);
      console.log(res.result);
      const musicList = res.result.songs.map((item: any) => ({
        picUrl: item.al.picUrl,
        song: {
          id: item.id,
          name: item.name,
          artists: item.ar,
          duration: item.dt,
        },
      }));
      setSearchList(musicList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHotList();
  }, []);
  return (
    <div className={`${classes.view_box}`}>
      <h2>Search</h2>
      <InputSearch
        allowClear
        placeholder="Enter keyword to search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e);
        }}
        style={{ width: "100%", marginBottom: "10px" }}
        className={classes.search_input}
        onSearch={handleSearch}
        onClear={()=>{
          handleSearch("")
        }}
      />
      <div className={classes.main}>
        {searchList.length == 0 ? (
          <div>
            <p className={classes.hot_search}>Hot Search</p>
            <ul className={classes.hot_list}>
              {hotList.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setSearchValue(item.first);
                      handleSearch(item.first);
                    }}
                  >
                    <span>{String(index + 1) + ". "}</span>
                    <span>{item.first}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <MusicList dataList={searchList}></MusicList>
        )}
      </div>
    </div>
  );
};

export default musicSearch;

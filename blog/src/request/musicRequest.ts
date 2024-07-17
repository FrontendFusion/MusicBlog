import musicService from "./musicIndex";

// 获取banner
export const getBanner = () => {
    return musicService({
        method: 'get',
        url: '/banner',
    });
}

// 获取推荐新音乐
export const getRecommendedMusic = () => {
    return musicService({
        method: 'get',
        url: '/personalized/newsong',
    });
}

// 获取热搜列表
export const getHotSearchList = () => {
    return musicService({
        method: 'get',
        url: '/search/hot',
    });
}

// 搜索
export const search = (keywords: string) => {
    return musicService({
        method: 'get',
        url: `/search?keywords=${keywords}`,
    });
}
import { PageParamsType } from "@/pages/Blog/components/BlogList/type/index";
import service from "./index";


// 登录
export const login = (data: any) => {
    return service({
        method: 'post',
        url: '/api/auth/local',
        data: data
    });
}

// 注册
export const register = (data: any) => {
    return service({
        method: 'post',
        url: '/api/auth/local/register',
        data: data
    });
}

// 注册后录入用户信息
export const registerUserInfo = (data: any) => {
    return service({
        method: 'post',
        url: '/api/user-infos',
        data: data
    });
}


// 获取blog列表
export const getBlogData = (params: PageParamsType) => {
    return service({
        method: 'get',
        url: '/api/blogs?sort=time:desc',
        params: { "pagination[page]": params.current, "pagination[pageSize]": params.pageSize },

    });
}

// 搜索博客
export const queryBlogData = (keyword: string) => {
    return service({
        method: 'get',
        url: `/api/blogs?filters[title][$containsi]=${keyword}`,
    })
}

// 新增blog
export const addBlogData = (data: any) => {
    return service({
        method: 'post',
        url: '/api/blogs',
        data: data,
    });
}

// 编辑blog 
export const editBlogData = (id: string, data: any) => {
    return service({
        method: 'put',
        url: `/api/blogs/${id}`,
        data: data,
    });
}

// 删除blog
export const deleteBlogData = (id: string) => { 
    return service({
        method: 'delete',
        url: `/api/blogs/${id}`,
    });
 }

// 获取blog详情
export const getBlogDetail = (id: string) => {
    return service({
        method: 'get',
        url: `/api/blogs/${id}`,
    });
}

// 获取相关推荐列表
export const getRelatedBlogData = (keywords: string[], id: string) => {
    console.log(keywords);
    const path = keywords.reduce((pre, cur) => {
        return pre + `&filters[type][$containsi]=${cur}`
    }, "").slice(1);

    return service({
        method: 'get',
        url: `/api/blogs?${path}&filters[id][$nei]=${id}`,
    });
}


// 获取PictureWall列表
export const getPictureWallData = () => {
    return service({
        method: 'get',
        url: '/api/picture-walls?fields[1]=des&populate=pic',
    });
}

// 上传图片到媒体库
export const uploadPictureToMediaLibrary = (data: any) => {
    return service({
        method: 'post',
        url: "/api/upload",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data
    });
}

// 媒体库上传图片到表
export const uploadPicture = (data: any) => {
    return service({
        method: 'post',
        url: "/api/picture-walls",
        data
    });
}

// 获取个人信息
export const getUserInfo = (userId: string) => {
    return service({
        method: 'get',
        url: `/api/user-infos?filters[userId][$eq]=${userId}`,
    })
}

// 根据id获取个人信息
export const getUserInfoById = (id: string) => {
    return service({
        method: 'get',
        url: `/api/user-infos/${id}`,
    })
}

// 更新个人信息
export const updateUserInfo = (id: string, data: any) => {
    return service({
        method: 'put',
        url: `/api/user-infos/${id}`,
        data
    })
}
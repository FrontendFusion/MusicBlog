export interface BlogDataItemType {
    title: string;
    content: string;
    type: string;
    time: string;
    id:string;
    [key: string]: any; // 允许其他属性
}

export type EditBlogDataType = Omit<BlogDataItemType, "time"> & {id:string};

export interface BlogListType {
    list: BlogDataItemType[];
    total: number;
}

export interface PageParamsType {
    pageSize: number, // 每页显示数量
    current: number, // 当前页数
}

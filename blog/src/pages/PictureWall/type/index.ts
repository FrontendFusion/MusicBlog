export interface ItemType {
    pathImg: string,
    offsetTop: number,
    des: string,
    style: {
        width: number;
        height: number;
        transform: string;
    },
}

export interface DataListType {
    list: ItemType[],
    columnsInfo: number[],
}
const repair0 = (m: number) => {
    return m < 10 ? '0' + m : m
};

/**
 * 处理时间
 * @param str 原始值
 * @returns 年月日、 时分组成的数组
 */
export const dateConversion = (str: string) => {
    let time = new Date(str)
    let ymd = time.getFullYear() + "-" + repair0(time.getMonth() + 1) + '-' + repair0(time.getDate())
    let hm = repair0(time.getHours()) + ':' + repair0(time.getMinutes())
    // return y + '-' + repair0(m) + '-' + repair0(d) + ' ' + repair0(h) + ':' + repair0(mm);
    return [ymd, hm];
}

// 节流函数
export const throttle = (fn: any, delay: number) => {
    let timer: any = null;
    return function (...arg: any) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, arg);
            }, delay);
        }
    };
};

export const getAuthor = (info: any) => {
    return info
        .reduce((pre: any, cur: any) => {
            return pre + "、" + cur.name;
        }, "")
        .substring(1);
};

// 毫秒转换成分、秒的格式
export const processingTime = (time: number) => {
    let minute = String(Math.floor(time / 60000)).padStart(2, "0");
    let second = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    return `${minute}:${second}`;
};

/**
 * @description 针对style中的属性无法自动转换单位，手动转换px为rem
 * @param pxVale 原始值
 * @param notUnit 是否返回单位
 * @returns 
 */
export const pxToRem = (pxVale: number, notUnit = false) =>{
    const level = parseFloat(document.documentElement.style.fontSize)
    if(notUnit){
        return `${pxVale / level}`
    }
    return `${pxVale / level}rem`
}

// 设置 rem 函数
export const setRem = () => {
    // 设计稿尺寸
    const designScreenWidth = 1280;
    // 获取屏幕的宽度
    let viewWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if(viewWidth < 700){
        viewWidth = 700
    }
    // 设置 rem 基准值
    const fontSize = Math.floor((viewWidth / designScreenWidth * 16) * 100) / 100;
    // 设置根元素字体大小
    document.documentElement.style.fontSize = fontSize + 'px';
}

export const initRem = () => {
    // 初始化
    setRem()
    // 改变窗口大小时重新设置 rem
    window.onresize = function () {
        setRem()
    }
}
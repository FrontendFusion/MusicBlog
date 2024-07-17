import React from "react"

interface MusicContextProps {
    isPlay: boolean
    playMusic: () => void
    pauseMusic: () => void
    changeMusicList: (list: any[]) => void
    changeCurIndex: (index: number) => void
    changeMusicPlay: () => void
    prevMusic: () => void
    nextMusic: () => void
    musicList: any[] // 音乐列表
    curIndex: number // 当前播放的音乐索引
}

const MusicContext = React.createContext<MusicContextProps>({
    isPlay: false,
    playMusic: () => { },
    pauseMusic: () => { },
    changeMusicList: () => { },
    changeCurIndex: () => {},
    changeMusicPlay: () => { },
    prevMusic: () => { },
    nextMusic: () => { },
    musicList: [],
    curIndex: 0
})

export default MusicContext
import React, { useRef, useState } from 'react'
import Player from './views/Player';
import Recommend from './views/Recommend/index';
import { NavLink, Routes, Route } from 'react-router-dom';
import style from './App.module.less';
import { Drawer } from 'antd';
import 'antd/dist/antd.css';
import Login from './views/Login';
import { useSelector } from 'react-redux';
import { initSong } from './states/songSlice';
type Props = {}

export default function App({ }: Props) {
  const audioRef: any = useRef<HTMLAudioElement>();
  const [drawerVisible, updateDrawerVisible] = useState(false);
  const { songlist } = useSelector((state) => (state as any).songlist);
  function onDrawerClose() {
    updateDrawerVisible(!drawerVisible);
  };
  function handleSongClick(index: number) {
    const song = songlist[index];
    const { al, ar, mv, id, dt } = song;
    dispatch(initSong({
      id: id,
      dt: dt,
      singer: ar.map((item: any) => item.name).join("/"),
      songName: al.name,
      picUrl: al.picUrl,
      index: index,
    }));
    audioRef.current.play();
  };
  function durationTrans(a: any) {
    var b = ""
    var h: number | string = parseInt((a / 3600).toString()),
      m: number | string = parseInt((a % 3600 / 60).toString()),
      s: number | string = parseInt((a % 3600 % 60).toString());
    if (h > 0) {
      h = h < 10 ? '0' + h : h
      b += h + ":"
    }
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    b += m + ":" + s
    return b;
  }
  return (
    <div className={style['App']}>
      <div className={style['nav-bar']}>
        <NavLink to="recommend" >推荐</NavLink >
        <NavLink to="ranking" >排行</NavLink >
        <NavLink to="search" >搜索</NavLink >
        <NavLink to="login" >登录</NavLink >
      </div>
      <Routes>
        <Route path='/' element={<Recommend />} />
        <Route path='/recommend' element={<Recommend />} />
        <Route path='/login' element={<Login />} />
        <Route path='/ranking' element={<></>} />
      </Routes>
      <Drawer
        title={"当前播放"}
        placement="right"
        closable={false}
        onClose={onDrawerClose}
        visible={drawerVisible}
        getContainer={false}
        width={420}
        bodyStyle={{ padding: 0, 
          overflowY: "hidden"}}
        className={style.container}
        style={{ position: 'absolute', height: "calc(100% - 75px)",  marginBottom: "75px" }}>
        <div className={style['list-container']}>
          {
            songlist.length > 0 && songlist.map((item: any, index: number) => {
              const { al, ar, mv, id, dt } = item;
              return (
                <div key={index} className={style['song-content']} onClick={() => handleSongClick(index)}>
                  <div className={style['song-name']}>
                    {al.name}
                  </div>
                  <div className={style['singer']}>
                    {ar.map((item: any) => item.name).join("/")}
                  </div>
                  <div className={style['duration']}>
                    {durationTrans(dt / 1000)}
                  </div>
                </div>
              )
            })
          }

        </div>
      </Drawer>
      <Player ref={audioRef} {...{ drawerVisible: drawerVisible, updateDrawerVisible: updateDrawerVisible }} />
    </div>
  )
}

function dispatch(arg0: { payload: any; type: string; }) {
  throw new Error('Function not implemented.');
}

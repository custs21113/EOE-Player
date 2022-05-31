import React, { useEffect, useRef, useState } from 'react'
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Routes, Route } from 'react-router-dom';

import { initSong } from './states/playerSlice';

import Ranking from './views/Ranking';
import Player from './views/Player';
import Recommend from './views/Recommend';
import Login from './views/Login';

import 'antd/dist/antd.css';
import style from './App.module.less';
import { autoUpdater } from 'electron';
import Lyric from 'lyric-parser';
type Props = {}

export default function App({ }: Props) {
  const dispatch = useDispatch();
  const audioRef: any = useRef<HTMLAudioElement>();
  const [drawerVisible, updateDrawerVisible] = useState<boolean>(false);
  let [ly, updateLy] = useState<Lyric | null>(null)
  const [currentLyric, updateCurrentLyric] = useState<string>("");
  const [lines, updateLines] = useState<Array<{ time: number; txt: string }> | undefined>([]);
  const [line, updateLine] = useState<number>(0);
  const [songDrawerVisible, updateSongDrawerVisible] = useState<boolean>(false);
  const player = useSelector((state) => (state as any).player);
  const { songlist, lyric, id } = player;
  function onDrawerClose() {
    updateDrawerVisible(!drawerVisible);
  };
  useEffect(() => {
    function handler({ lineNum, txt }: any) {
      console.log(lineNum)
      updateLine(lineNum);
      updateCurrentLyric(txt);
    }
    if (ly !== null) {
      console.log(currentLyric)
      ly?.stop();
    }
    lyric && updateLy(() => ly = new Lyric(lyric, handler))
    // l?.play(0)
    // const ly = new Lyric(lyric, handler);
    console.log(46,ly);
    ly?.play(0);
    // console.log(l?.lines);
    updateLines(ly?.lines)
    return () => {
      // l?.stop();
    }
  }, [lyric]);
  // useEffect(() => {
  //   document.addEventListener('click', function () {
  //     updateDrawerVisible(false);
  //   })
  // }, [])
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
      <div style={{
        paddingBottom: "75px"
      }}>

        <Routes>
          <Route path='/' element={<Recommend />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/login' element={<Login />} />
          <Route path='/ranking' element={<Ranking />} />
        </Routes>
      </div>
      <Drawer
        title={"当前播放"}
        placement="right"
        closable={false}
        onClose={onDrawerClose}
        visible={drawerVisible}
        getContainer={false}
        width={420}
        // mask={false}
        zIndex={-1}
        maskStyle={{
          backgroundColor: "transparent",
          zIndex: -1
        }}
        bodyStyle={{
          padding: 0,
          overflowY: "scroll",
          height: drawerVisible ? "calc(100% - 75px)" : "0px"
        }}
        className={drawerVisible ? style.container : ""}
        style={{ position: 'absolute', height: drawerVisible ? "calc(100% - 75px)" : "0px", marginBottom: "75px", zIndex: drawerVisible ? 1001 : -1 }}>
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
      <Drawer
        placement="bottom"
        closable={false}
        onClose={() => {
          updateSongDrawerVisible(!songDrawerVisible)
        }}
        visible={songDrawerVisible}
        getContainer={false}
        mask={false}
        bodyStyle={{
          padding: 0,
          overflow: "hidden",
          height: songDrawerVisible ? "calc(100% - 75px)" : "0px"
        }} style={{ position: 'absolute', height: songDrawerVisible ? "calc(100% - 75px)" : "0px", marginBottom: "75px", zIndex: songDrawerVisible ? 1000 : -1 }}
      >
        <div>
          <div
            style={{
              width: songDrawerVisible ? "980px" : "0px",
              height: songDrawerVisible ? "775px" : "0px",
              margin: "auto",
            }}
          >
            <div style={{
              width: "360px",
              height: "520px",
              border: "1px solid black",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}>
              <ul style={{
                overflowY: "hidden",
                height: "520px",
              }}>
                {
                  lines?.map(({ time, txt }: any, index: React.Key | null | undefined) => {
                    return (
                      <li key={index} style={{
                        fontWeight: line === index ? "bold" : 400
                      }} onClick={
                        () => {
                          ly?.play(time)
                        }
                      }>{txt}</li>
                    )
                  })
                }
              </ul>
            </div>
            <button style={{
              position: "absolute",
              bottom: 0
            }}>TEST</button>
          </div>
        </div>
      </Drawer>
      <div
      className={style['drawer']}
      style={{
        display: drawerVisible ? "none" : "none"
      }}
      >TEWT</div>
      <Player ref={audioRef} {...{ drawerVisible: drawerVisible, updateDrawerVisible: updateDrawerVisible, songDrawerVisible, updateSongDrawerVisible }} />
    </div>
  )
}

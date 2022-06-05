import React, { useEffect, useRef, useState } from 'react'
import { Drawer, message } from 'antd';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { NavLink, Routes, Route } from 'react-router-dom';
import { getLyricService, initSong } from './states/playerSlice';

import Ranking from './views/Ranking';
import Player from './views/Player';
import Recommend from './views/Recommend';
import Search from './views/Search';
import Login from './views/Login';

import 'antd/dist/antd.css';
import style from './App.module.less';

import Lyric from 'lyric-parser';
import { fetchUserById } from './states/testSlice';
import { AppDispatch } from './states/store';
import { durationTrans } from './utils/format';
type Props = {}
let ipcRenderer: any = null;
// @ts-ignore
const electron = window.electron;
ipcRenderer = electron.ipcRenderer;
// if (NODE_ENV === 'production') {
//   // @ts-ignore
//   const electron = window.electron;
//   ipcRenderer = electron.ipcRenderer;
// } else {
//   // @ts-ignore
//   ipcRenderer = null;
// }

export default function App({ }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const audioRef: any = useRef<HTMLAudioElement>();
  const scrollRef: any = useRef();
  const [drawerVisible, updateDrawerVisible] = useState<boolean>(false);
  let [ly, updateLy] = useState<Lyric | null>(null)
  const [currentLyric, updateCurrentLyric] = useState<string>("");
  let [lines, updateLines] = useState<Array<{ time: number; txt: string }> | undefined>([]);
  const [line, updateLine] = useState<number>(0);
  const [songDrawerVisible, updateSongDrawerVisible] = useState<boolean>(false);
  const [isPlaying, updateIsPlaying] = useState<boolean>(false);
  const { loop, volume, id, singer, songName, picUrl, dt, lyric, song, songList } = useSelector((state) => (state as any).player, shallowEqual);
  const { entities, loading } = useSelector((state) => (state as any).test, shallowEqual);
  const player = useSelector((state) => (state as any).player, shallowEqual);

  function onDrawerClose() {
    updateDrawerVisible(!drawerVisible);
  };
  // console.log('ipc', ipcRenderer)
  function minimize() {
    // ipcRenderer?.send('window-minimize');
  }
  function maximize() {
    // ipcRenderer?.send('window-maximize');
  }
  function close() {
    // ipcRenderer?.send('window-close');
  }
  useEffect(() => {
    const initPlayer = async () => {
      if (audioRef.current && id) {
        audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
        audioRef.current.preload = "auto";

        dispatch(getLyricService(id));


        audioRef.current.oncanplay = () => {
          audioRef.current?.play();
          audioRef.current.volume = volume / 100;
          updateIsPlaying(true);
        }
      }
      return () => {
      }
    }
    initPlayer();
  }, [id]);

  useEffect(() => {
    if (lyric !== "") {
      function handler({ lineNum, txt }: any) {
        // console.log(lineNum, txt);
        updateCurrentLyric(txt);
        updateLine(lineNum)
        console.log(scrollRef.current.clientHeight)
        if (lineNum * 22 >= scrollRef.current.clientHeight / 2) {
          scrollRef.current.scrollTop += 22;

        }
      }
      if (ly !== null) {
        ly.stop();
      }
      updateLy(() => {
        ly = new Lyric(lyric, handler);
        ly?.play(0)
        return ly;
      });
      updateLines(() => {
        return lines = ly?.lines
      })
    }
  }, [lyric]);
  useEffect(() => {
    document.addEventListener('click', function () {
      updateDrawerVisible(false);
      // updateSongDrawerVisible(false);
    })
  }, [])
  function handleSongClick(index: number) {
    const song = songList[index];
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


  return (
    <div className={style['App']}>
      <div className={style['header']}>
        <div style={{ color: "white" }}>ICON</div>
        <div className={style['nav-bar']}>
          <NavLink to="recommend" >推荐</NavLink >
          <NavLink to="ranking" >排行</NavLink >
          <NavLink to="search" >搜索</NavLink >
          <NavLink to="login" >登录</NavLink >
        </div>
        <div className={style['window-control']}>
          <div className={style['minimize']} onClick={minimize}></div>
          <div className={style['enlarge']} onClick={maximize}></div>
          <div className={style['close']} onClick={close}></div>
        </div>
      </div>
      <div style={{
        paddingBottom: "75px"
      }}>

        <Routes>
          <Route path='/' element={<Recommend />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<Login />} />
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
        mask={false}
        zIndex={-1}
        bodyStyle={{
          padding: 0,
          overflowY: "scroll",
          height: drawerVisible ? "calc(100% - 75px)" : "0px"
        }}

        className={drawerVisible ? style.container : ""}
        style={{ position: 'absolute', height: drawerVisible ? "calc(100% - 125px)" : "0px", marginTop: "50px", marginBottom: "75px", zIndex: drawerVisible ? 1001 : -1 }}>
        <div className={style['list-container']}>
          {
            songList?.length > 0 && songList.map((item: any, index: number) => {
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
            <div ref={scrollRef} style={{
              width: "360px",
              height: "520px",
              border: "1px solid black",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              overflow: "auto"
            }}>
              <ul>
                {
                  lines?.map(({ time, txt }: any, index: React.Key | null | undefined) => {
                    return (
                      <li key={index} style={{
                        fontWeight: line === index && songDrawerVisible ? "bold" : 400
                      }} onClick={
                        () => {
                          ly?.play(time);
                          console.log(time / 1000);
                          audioRef.current.currentTime = time / 1000;
                          // console.log(audioRef.current)
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
            }} onClick={() => {
              audioRef.current.pause();
            }}>pause</button>
            <button style={{
              position: "absolute",
              bottom: 0,
              left: 100
            }} onClick={() => {
              audioRef.current.play();
            }}>play</button>
            {
              currentLyric
            }
            <div>
              {...entities}-
              {loading}<button onClick={
                () => {
                  dispatch(fetchUserById(33))
                }
              }>
                PUSH</button></div>
          </div>
        </div>
      </Drawer>
      <div
        className={style['drawer']}
        style={{
          display: drawerVisible ? "none" : "none"
        }}
      >TEWTb</div>
      <Player ref={audioRef} {...{ drawerVisible: drawerVisible, updateDrawerVisible: updateDrawerVisible, songDrawerVisible, updateSongDrawerVisible, isPlaying, updateIsPlaying, currentLyric }} />
    </div>
  )
}

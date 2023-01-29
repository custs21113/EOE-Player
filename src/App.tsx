import React, { useEffect, useRef, useState } from 'react'
import { Drawer } from 'antd';
import Lyric from 'lyric-parser';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { NavLink, Routes, Route } from 'react-router-dom';

import { Ranking, Player, Recommend, Search, Login } from './views'
import { AppDispatch } from './states/store';
import { getLyricService, initSong } from './states/playerSlice';

import { durationTrans } from './utils/format';
import { ipcRenderer } from './utils/bridge';
import style from './App.module.less';
import eoe from "@/assets/images/eoe.jpg";

type Props = {}

export default function App({ }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const audioRef: any = useRef<HTMLAudioElement>();
  const scrollRef: any = useRef();
  const ref: any = useRef();
  const oref: any = useRef();
  const ablumRef: any = useRef();
  let [ly, updateLy] = useState<Lyric | null>(null)
  const [currentLyric, updateCurrentLyric] = useState<string>("");
  let [lines, updateLines] = useState<Array<{ time: number; txt: string }> | undefined>([]);
  const [line, updateLine] = useState<number>(0);
  const [songDrawerVisible, updateSongDrawerVisible] = useState<boolean>(false);
  const [isPlaying, updateIsPlaying] = useState<boolean>(false);
  const [like, updateLike] = useState<boolean>(false);
  const [drawerVisible, updateDrawerVisible] = useState(false);
  const { volume, id, lyric, songList, picUrl = eoe } = useSelector((state) => (state as any).player, shallowEqual);

  function minimize() {
    ipcRenderer?.send('window-minimize');
  }
  function maximize() {
    ipcRenderer?.send('window-maximize');
  }
  function close() {
    ipcRenderer?.send('window-close');
  }
  function hotupdate() {
    ipcRenderer?.send('hotupdate');
  }
  useEffect(() => {
    const initPlayer = async () => {
      if (audioRef.current && id) {
        audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
        audioRef.current.preload = "auto";
        dispatch(getLyricService(id));
        audioRef.current.oncanplay = () => {
          if (scrollRef.current?.scrollTop) {
            console.log(scrollRef.current.scrollTop)
            scrollRef.current.scrollTop = 0;
          }
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
    if (songList.length !== 0) {
      console.log(songList)
      const song = songList[0];
      const { name, al, ar, mv, id, dt } = song;
      dispatch(initSong({
        id: id,
        dt: dt,
        singer: ar.map((item: any) => item.name).join("/"),
        songName: name,
        picUrl: al.picUrl,
        index: 0
      }));
    }
  }, [songList.length])
  useEffect(() => {
    if (lyric !== "") {
      function handler({ lineNum, txt }: any) {
        updateCurrentLyric(txt);
        updateLine(lineNum)
        if (scrollRef.current?.clientHeight && lineNum * 22 >= scrollRef.current.clientHeight / 2) {
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
    ref.current.addEventListener('click', function () {
      updateDrawerVisible(false);
      // updateSongDrawerVisible(false);
    });
    oref.current.addEventListener('click', function () {
      updateDrawerVisible(false);
      // updateSongDrawerVisible(false);
    });
  }, [])

  const handleSongClick = (index: number) => {
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

  const switchDrawer = () => {
    updateDrawerVisible(!drawerVisible);
  }
  const switchLike = () => {
    updateLike(!like);
  }
  const switchAblumRotate = () => {
    console.log(ablumRef.current)
    console.log(ablumRef.current.class)
    console.log(ablumRef.current.style)
    // ablumRef.current.animation = "ablum-rotate 30s linear infinite";
  }
  const download = (id: number, songName: string, singers: string) => {
    ipcRenderer?.invoke('showmenu', id, songName, singers);
  }
  ipcRenderer?.on('showmenu-reply', function (event, arg) {
    console.log(arg);
  });
  return (
    <div className={style['App']}>
      <div className={style['content']}>
        <div className={style['header']}>
          <div className={style['icon']}></div>
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
        <Drawer
          placement={"right"}
          closable={false}
          // onClose={onDrawerClose}
          open={drawerVisible}
          getContainer={false}
          width={420}
          mask={false}
          maskClosable={false}
          bodyStyle={{
            padding: 0,
            overflowY: "scroll",
            height: drawerVisible ? "calc(100% - 25px)" : "0px",
          }}

          className={drawerVisible ? style.container : ""}
          style={{
            position: "sticky",
            top: "50px",
            height: drawerVisible ? "725px" : "0px",
            zIndex: drawerVisible ? 1002 : -1
          }}>
          <div className={style['list-header']}>
            <div className={style['list-header-title']}>当前播放</div>
            <div className={style['list-header-detail']}>
              <div className={style['songs-total']}>总{songList.length || 0}首</div>
              <div className={style['songs-collect']}>收藏全部</div>
              <div className={style['songs-clear']}>清空列表</div>
            </div>
            <div className={style['list-header-devide']}></div>
          </div>
          <div className={style['list-container']}>
            {
              songList?.length > 0 && songList.map((item: any, index: number) => {
                const { al, ar, mv, id, dt, name } = item;
                const singers = ar.map((item: any) => item.name).join("/");
                return (
                  <div key={index} className={style['song-content']} onContextMenu={() => download(id, name, singers)}>
                    <div className={style['song-name']} onDoubleClick={() => handleSongClick(index)}>
                      {name}
                    </div>
                    <div className={style['singer']}>
                      {singers}
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
        <div ref={oref}>
          <Drawer
            placement="bottom"
            closable={false}
            onClose={() => {
              updateSongDrawerVisible(!songDrawerVisible)
            }}
            open={songDrawerVisible}
            getContainer={false}
            mask={false}
            height={"775px"}

            style={{ position: 'absolute', width: '100vw', marginTop: '-50px', height: songDrawerVisible ? "775px" : "0px", marginBottom: "75px", zIndex: songDrawerVisible ? 101 : -1, display: songDrawerVisible ? "block" : "none" }}
          >
            <div className={style['drawer-content']}>
              <div className={style['control-header']}>
                <div></div>
                <div className={style['window-control']}>
                  <div className={style['minimize']} onClick={minimize}></div>
                  <div className={style['enlarge']} onClick={maximize}></div>
                  <div className={style['close']} onClick={close}></div>
                </div>
              </div>
              <div className={style['album-container']}>
                <div className={style['pin']}></div>
                <div className={style['album']}>
                  <img className={isPlaying ?
                    [style['album-img'], style['rotate'], style['running']].join(' ') :
                    [style['album-img'], style['rotate'], style['pause']].join(' ')}
                    ref={ablumRef} src={picUrl === "" ? eoe : picUrl} width={128} height={128} alt="" />
                </div>
              </div>
              <div ref={scrollRef} className={style["lyric-drawer-container"]} >
                <ul style={{ listStyle: "none" }}>
                  {
                    lines?.map(({ time, txt }: any, index: React.Key | null | undefined) => {
                      return (
                        <li key={index} style={{
                          fontWeight: line === index && songDrawerVisible ? "bold" : 400,
                        }} onClick={
                          () => {
                            ly?.play(time);
                            audioRef.current.currentTime = time / 1000;
                          }
                        }>{txt}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </Drawer>
        </div>
        <div className={style['content-container']} ref={ref} style={{ display: songDrawerVisible ? "none" : "block" }}>
          <Routes>
            <Route path='/' element={<Recommend />} />
            <Route path='/recommend' element={<Recommend />} />
            <Route path='/ranking' element={<Ranking />} />
            <Route path='/search' element={<Search />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
      <Player ref={audioRef} {...{ switchDrawer: switchDrawer, songDrawerVisible, updateSongDrawerVisible, isPlaying, updateIsPlaying, currentLyric, like, switchLike }} />
    </div>
  )
}

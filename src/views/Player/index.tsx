import React, { forwardRef, useEffect, useRef, useState } from 'react'
import style from './index.module.less'
import { useSelector, useDispatch } from 'react-redux';
import { initSong } from '../../states/songSlice';
import { Slider, Drawer } from 'antd'
import getSong from '../../service/getSong';
// import {Store} from '@/states/store.js'
type Props = {
  drawerVisible: boolean;
  updateDrawerVisible: Function;
}

function index(props: Props, audioRef: any) {
  const dispatch = useDispatch();
  const {drawerVisible, updateDrawerVisible } = props;
  const [currentTime, updateCurrentTime] = useState(0);
  const [showSonglist, updateShowSonglist] = useState(false);
  const [isPlaying, updateIsPlaying] = useState(false);
  const [isSeeking, updateIsSeeking] = useState(false);
  // const audioRef: any = useRef<HTMLAudioElement>();
  const { id, singer, songName, picUrl, dt, index } = useSelector((state) => (state as any).song);
  const { songlist } = useSelector((state) => (state as any).songlist);
  const song = useSelector(state => (state as any).song);
  let timer: any = null;
  function timeUpdate(e: any) {
    let currentTime = e.target.currentTime;
    !isSeeking && updateCurrentTime(currentTime);
  }
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
  function handlePrevBtn() {
    if (songlist.length !== 0) {
      const currentIndex = (index + songlist.length - 1) % songlist.length;
      console.log(index, currentIndex);
      const { al, ar, mv, id, dt } = songlist[currentIndex];
      dispatch(initSong({
        id: id,
        dt: dt,
        singer: ar.map((item: any) => item.name).join("/"),
        songName: al.name,
        picUrl: al.picUrl,
        index: currentIndex
      }));
    }
  }
  function handleNextBtn() {
    if (songlist.length !== 0) {
      const currentIndex = (index + 1) % songlist.length;
      console.log(index, currentIndex);
      const { al, ar, mv, id, dt } = songlist[currentIndex];
      dispatch(initSong({
        id: id,
        dt: dt,
        singer: ar.map((item: any) => item.name).join("/"),
        songName: al.name,
        picUrl: al.picUrl,
        index: currentIndex
      }));
    }
  }
  function handleSliderChange(value: number) {
    updateIsSeeking(true)
    updateCurrentTime(value);
    // updateNextTime(value);
  }
  function handleSliderChangeEnd(value: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      updateIsSeeking(false)
    }
  }
  function handleSongClick (index: number) {
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
  }
  async function handleAudioEnd() {
    console.log("END")
    await handleNextBtn();
    audioRef.current?.play();
  }
  useEffect(() => {
    const initPlayer = async () => {
      if (audioRef.current && id) {
        audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
        audioRef.current.preload = "auto";

        audioRef.current.oncanplay = () => {
          audioRef.current?.play();
          updateIsPlaying(true);
        }
      }
      return () => {

      }
    }
    initPlayer();
  }, [song]);
  useEffect(()=> {
    document.addEventListener('click', function() {
      updateShowSonglist(false);
    })
  }, [])
  return (
    <div className={style.player}>
      <div className={style['song-info']}>
        <img src={picUrl} alt="" className={style['ablumn']} />
        <div className={style['song']}>
          <div className={style['song-detail']}>
            <div className={style['song-name']}>{songName}</div>
          </div>
          <div className={style['song-singer']}>{singer}</div>
        </div>
      </div>
      <div className={style['progress-bar-content']}>
        <div className={style['lyric']}>lyric--{currentTime}</div>
        <div className={style['progress-bar']}>
          <audio
            ref={audioRef}
            onTimeUpdate={timeUpdate}
            onEnded={handleAudioEnd}
          />
          <Slider value={currentTime} min={0} max={Math.round(dt / 1000)} onChange={(value) => handleSliderChange(value)}
            onAfterChange={(value) => handleSliderChangeEnd(value)}
            step={1}
            tooltipVisible={false} vertical={false} className={style['slider']}></Slider>
        </div>
      </div>
      <div className={style['control-container']}>
        <div className={style['control']}>
          <div className={style['play-control']}>
            <div className={style.prev} onClick={handlePrevBtn}></div>
            <div className={isPlaying ? style.pause : style.play} onClick={async () => {
              if (isPlaying) {
                audioRef.current?.pause();
                updateIsPlaying(false);
              } else {
                audioRef.current?.play();
                updateIsPlaying(true);
              }
            }}></div>
            <div className={style.next} onClick={handleNextBtn}></div>
          </div>
          <div className={style['other-control']}>
            <div className={style.dislike}></div>
            <div className={style.circle}></div>
            <div className={style.list}  onClick={(e) => {
                console.log('CLLLL')
                e.preventDefault();
                e.stopPropagation();
                updateShowSonglist(!showSonglist);
                updateDrawerVisible(!drawerVisible);
              }}>
              {/* <div className={showSonglist ? style['list-container']: style['list-container-hide']}>
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
              </div> */}
              
            </div>
          </div>
        </div>
        <div className={style['volume-control']}>
          <div>{durationTrans(currentTime)}/{dt === 0 ? "00:00" : durationTrans(dt / 1000)}</div>
          <Slider defaultValue={0.3} min={0} max={100} step={1} vertical={false} className={style['volume']}></Slider>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(index);
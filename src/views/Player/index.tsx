import React, { forwardRef, MouseEventHandler, useState } from 'react'
import style from './index.module.less'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Slider } from 'antd'
import Lyric from 'lyric-parser';
import { changeLoop, changeVolume, nextSong, prevSong, randomPlay } from '../../states/playerSlice';
import { AppDispatch } from '../../states/store';
import { durationTrans } from '../../utils/format';
import eoe from "@/assets/images/eoe.jpg";

type Props = {
  like: boolean;
  switchLike: () => void;
  switchDrawer: () => void;
  songDrawerVisible: boolean;
  updateSongDrawerVisible: Function;
  isPlaying: boolean;
  updateIsPlaying: Function;
  currentLyric: string;
}

function index(props: Props, audioRef: React.Ref<HTMLAudioElement> | any): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { like, switchLike, switchDrawer, songDrawerVisible, updateSongDrawerVisible, isPlaying, updateIsPlaying, currentLyric } = props;
  const [currentTime, updateCurrentTime] = useState(0);
  const [isSeeking, updateIsSeeking] = useState(false);
  let [l, updateL] = useState<Lyric | null>(null)
  // let [lyric, updateLyric] = useState<string>(currentLyric);
  const { loop, volume, id, singer, songName, picUrl = eoe, dt } = useSelector((state) => (state as any).player, shallowEqual)
  // const { loop, volume, id, singer, songName, picUrl, dt, lyric } = player;
  function timeUpdate(e: any) {
    let currentTime = e.target.currentTime;
    !isSeeking && updateCurrentTime(currentTime);
  }

  function handlePrevBtn() {
    dispatch(prevSong())
  }
  function handleNextBtn() {
    dispatch(nextSong())
  }
  function handleSliderChange(value: number) {
    updateIsSeeking(true)
    updateCurrentTime(value);
  }
  function handleSliderChangeEnd(value: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      updateIsSeeking(false)
    }
  }
  function handleVolumeChange(value: number) {
    dispatch(changeVolume({ volume: value }))
    audioRef.current.volume = volume / 100;
  }
  function handleVolumeSliderChangeEnd(value: number) {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
      // dispatch(changeVolume({ volume }))
    }
  }
  function parseLoop(loop: number) {
    switch (loop) {
      case 0:
        return style.listloop;
      case 1:
        return style.single;
      case 2:
        return style.random;
      default:
        return style.listloop;
    }
  }
  function randomSong() {
    dispatch(randomPlay())
  }
  async function handleAudioEnd() {
    updateIsPlaying(false);
    switch (loop) {
      case 0:
        return await handleNextBtn();
      case 1:
        return audioRef.current?.play();
      case 2:
        return await randomSong();
      default:
        return await handleNextBtn();
    }
  }

  return (
    <div className={style["player-container"]} onClick={(e) => e.preventDefault()}>
      <div className={style['player']}>
        <div className={style['song-info']}>
          <img src={picUrl === "" ? eoe : picUrl} alt="" className={style['ablumn']} onClick={() => {
            updateSongDrawerVisible(!songDrawerVisible);
          }} />
          <div className={style['song']}>
            <div className={style['song-detail']}>
              <div className={style['song-name']}>{songName}</div>
            </div>
            <div className={style['song-singer']}>{singer}</div>
          </div>
        </div>
        <div className={style['progress-bar-content']}>
          <div className={style['lyric']}>{currentLyric}</div>
          <div className={style['progress-bar']}>
            <audio
              ref={audioRef}
              onTimeUpdate={timeUpdate}
              onEnded={handleAudioEnd}
            />
            <Slider value={currentTime} min={0} max={Math.round(dt / 1000)} onChange={(value: number) => handleSliderChange(value)}
              onAfterChange={(value: number) => handleSliderChangeEnd(value)}
              step={1}
              tooltipVisible={false} vertical={false} className={style['slider']}></Slider>
          </div>
        </div>
        <div className={style['control-container']}>
          <div className={style['control']}>
            <div className={style['play-control']}>
              <div className={style.prev} onClick={handlePrevBtn}></div>
              <div className={isPlaying ? style.pause : style.play} onClick={async () => {
                try {
                  if (isPlaying) {
                    audioRef.current?.pause();
                    updateIsPlaying(false);
                  } else {
                    audioRef.current?.play();
                    updateIsPlaying(true);
                  }
                } catch (error) {
                  console.error(error);
                }
              }}></div>
              <div className={style.next} onClick={handleNextBtn}></div>
            </div>
            <div className={style['other-control']}>
              <div className={like ? style['like'] : style['dislike']} onClick={switchLike}></div>
              <div className={parseLoop(loop)} onClick={() => dispatch(changeLoop({ loop }))}></div>
              <div className={style.list} onClick={switchDrawer}>
              </div>
            </div>
          </div>
          <div className={style['volume-control']}>
            <div>{durationTrans(currentTime)}/{dt === 0 ? "00:00" : durationTrans(dt / 1000)}</div>
            <Slider value={volume} onChange={(value: number) => handleVolumeChange(value)}
              onAfterChange={(value: number) => handleVolumeSliderChangeEnd(value)}
              min={0} max={100} step={1} vertical={false} className={style['volume']}></Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(index);
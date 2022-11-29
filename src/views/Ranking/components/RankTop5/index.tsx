import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import getSongList from '../../../../service/getSongList';
import { addSongToPlayList, initSong } from '../../../../states/playerSlice';
import { AppDispatch } from '../../../../states/store';
import style from "./index.module.less";

export type RankTop5Props = {
  songs: any[];
  name: string;
  coverImgUrl: any;
}
const RankTop5 = (props: RankTop5Props) => {
  const { songs, name, coverImgUrl } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { songList } = useSelector((state) => (state as any).player, shallowEqual);
  function handleSongClick(song: any) {
    const { al, ar, mv, id, dt } = song;
    dispatch(addSongToPlayList({
      ...song,
      id: id,
      dt: dt,
      singer: ar.map((item: any) => item.name).join("/"),
      songName: al.name,
      picUrl: al.picUrl,
      index: songList.length,
    }));
  };
  return (
    <div className={style.rankTop5}>
      <img className={style.rankCover} src={`${coverImgUrl}?param=${170}x${170}`} title={name} alt={name} />
      <div className={style.songContainer}>
        {
          songs.length > 0 && songs?.map((song : any, index: number) => {
            const { name, id, ar } = song;
            return (
              <div key={id} className={style.songItem}>
                <div className={style.index}>{index + 1}</div>
                <div className={style.songName} onClick={() => handleSongClick(song)}>{name}</div>
                <div className={style.singer} title={ar.map((item: any) => item.name).join("/")}>{ar.map((item: any) => item.name).join("/")}</div>
              </div>
            )
          })
        }
        <div className={style.songItem}>
          <div className={style.more}>查看全部&nbsp;&gt;</div>
        </div>
      </div>
    </div>
  )
};

export default RankTop5;
import React, { useEffect, useState } from 'react'
import getSongList from '../../../../service/getSongList';
import style from "./index.module.less";

type Props = {
  songs: any[];
  name: string;
  coverImgUrl: any;
}
const RankTop5 = (props: Props) => {
  const { songs, name, coverImgUrl } = props;
  return (
    <div className={style.rankTop5}>
      <img className={style.rankCover} src={`${coverImgUrl}?param=${170}x${170}`} title={ name} alt={name} />  
      <div className={style.songContainer}>
        {
          songs.length > 0 && songs?.map(({ name, id, ar }: any, index: number) => {
            return (
              <div key={id} className={style.songItem}>
                <div className={style.index}>{index+1}</div>
                <div className={style.songName}>{name}</div>
                <div className={style.singer}>{ar.map((item: any) => item.name).join("/")}</div>
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
}

export default RankTop5;
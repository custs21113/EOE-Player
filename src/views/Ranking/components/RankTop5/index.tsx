import React, { useEffect, useState } from 'react'
import getSongList from '../../../../service/getSongList';
import style from "./index.module.less";

type Props = {
  rankList: any;
}
const RankTop5 = (props: Props) => {
  const { rankList } = props;
  const [songList, updateSongList] = useState([]);
  useEffect(() => {
    async function updateRankList(id: number) {
        const { songs } = await getSongList(id, 5);
        updateSongList(songs);
      }
    if (rankList?.id !== 0) {
      updateRankList(rankList?.id);
    }
  }, [])
  return (
    <div className={style.rankTop5}>
      <img className={style.rankCover} src={`${rankList?.coverImgUrl}?param=${170}x${170}`} title={rankList?.name} alt={rankList?.name} />  
      <div className={style.songContainer}>
        {
          songList.length > 0 && songList?.map(({ name, id, ar }: any, index: number) => {
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
import { Divider, Skeleton, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import getPlaylist from '../../service/getPlaylist'
import getSongList from '../../service/getSongList'
import { initSong, initSongList } from '../../states/playerSlice'
import { AppDispatch } from '../../states/store'
import RankItem from './components/RankItem'
import RankTop5 from './components/RankTop5'
import style from './index.module.less';
type Props = {}
const Ranking = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [globalRankList, updateGlobalRankList]: [any[], Function] = useState([]);
  // const [officialRankList, updateOfficialRankList]: [any[], Function] = useState([]);
  const [officialRankListData, updateOfficialRankListData]: [any[], Function] = useState([]);

  const { songList } = useSelector((state) => (state as any).player, shallowEqual);
  useEffect(() => {
    const playlist = async () => {
      const { data } = await getPlaylist();
      updateGlobalRankList(data.list.filter((item: any) => !item.ToplistType));
      const promiseArray = data.list.filter((item: any) => item.ToplistType).map(async ({ id, name, coverImgUrl }: any) => {
        const { songs } = await getSongList(id, 5);
        return { songs, name, coverImgUrl };
      });
      updateOfficialRankListData(await Promise.all(promiseArray));
      return () => {

      }
    };
    playlist();
  }, []);
  const handleSongListOnClick = async (id: number) => {
    const { songs } = await getSongList(id);
    dispatch(initSongList(songs));
  };
  useEffect(() => {
    if (songList.length !== 0) {
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
  }, [songList])
  return (
    <div className={style.rankingPage}>
      <div>官方榜</div>
      <div>
        {
          officialRankListData.map((item: any, index: number) => {
            return (
              <RankTop5 {...item} key={index} />
            )
          })
        }
      </div>
      <div>全球榜</div>
      <div className={style.globalRankListContainer}>
        {
          globalRankList.map((item: any, index: number) => {
            return (
              <RankItem key={index} rankName={item.name} imgSrc={item.coverImgUrl} rankUpdateTime={new Date().toLocaleDateString()} onClick={() => handleSongListOnClick(item.id)} />
            )
          })
        }

      </div>
    </div>
  )
}

export default Ranking
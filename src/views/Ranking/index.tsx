import { Divider, Skeleton, Spin } from 'antd'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import getPlaylist from '../../service/getPlaylist'
import getSongList from '../../service/getSongList'
import { initSong, initSongList } from '../../states/playerSlice'
import { clear, initGlobalRankList, initOfficialRankListData } from '../../states/rankingSlice'
import { AppDispatch } from '../../states/store'
import RankItem from './components/RankItem'
import RankTop5, { RankTop5Props } from './components/RankTop5'
import style from './index.module.less';
type Props = {}
const Ranking = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { songList } = useSelector((state) => (state as any).player, shallowEqual);
  const ranking = useSelector((state) => (state as any).ranking, shallowEqual);
  // const { globalRankList, officialRankListData } = ranking;
  // const { globalRankList: GRL, officialRankListData: ORLD } = useSelector((state) => (state as any).ranking, shallowEqual);
  const { globalRankList, officialRankListData } = useSelector((state) => (state as any).ranking, shallowEqual);

  const [flag, updateFlag] = useState(true);
  useLayoutEffect(() => {
    if(officialRankListData.length > 0) {
      updateFlag(false);
    }
  }, [officialRankListData])
  // const [globalRankList, updateGlobalRankList]: [any[], Function] = useState(GRL);
  // const [officialRankList, updateOfficialRankList]: [any[], Function] = useState([]);
  // const [officialRankListData, updateOfficialRankListData]: [any[], Function] = useState(ORLD);
  useEffect(() => {
    const playlist = async () => {
      if(globalRankList.length || officialRankListData.length > 0) return;
      const { data } = await getPlaylist();
      const grl = data.list.filter((item: any) => !item.ToplistType);
      const promiseArray = data.list.filter((item: any) => item.ToplistType).map(async ({ id, name, coverImgUrl }: any) => {
        const { songs } = await getSongList(id, 5);
        return { songs, name, coverImgUrl };
      });
      const ord = await Promise.all(promiseArray);
      // updateGlobalRankList(grl);
      // updateOfficialRankListData(ord);
      dispatch(initGlobalRankList(grl));
      dispatch(initOfficialRankListData(ord));
      return () => {
      }
    };
    playlist();
  }, []);
  // useEffect(() => {
  //   updateGlobalRankList(GRL);
  //   updateOfficialRankListData(ORLD);
  // }, [GRL, ORLD]);
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
  }, [songList]);
  async function getData() {
    const { data } = await getPlaylist();
    const grl = data.list.filter((item: any) => !item.ToplistType);
    // updateGlobalRankList(grl);
    const promiseArray = data.list.filter((item: any) => item.ToplistType).map(async ({ id, name, coverImgUrl }: any) => {
      const { songs } = await getSongList(id, 5);
      return { songs, name, coverImgUrl };
    });
    const ord = await Promise.all(promiseArray)
    // updateOfficialRankListData(ord);
    dispatch(initGlobalRankList(grl));
    dispatch(initOfficialRankListData(ord));

  }
  const CallBackRT5 = useCallback((rankTop5Props: RankTop5Props) => <RankTop5 {...rankTop5Props} />, [officialRankListData])
  // React.memo(RankTop5(rankTop5Props: RankTop5Props) {

  // })
  const RankTop = useMemo(() => {
    console.log('render');
    return(
      <div>
        {
          flag ? <Spin spinning={ flag }/> :officialRankListData.map((item: RankTop5Props, index: number) => {
            return (
              <RankTop5 {...item} key={index} />
              // <CallBackRT5 {...item} key={index} />
            )
          })
        }
      </div>
    )
  }, [officialRankListData, flag])
  return (
    <div className={style.rankingPage}>
      <div className={style.rankingContainer}>
        {/* <button style={{
          color: "white"
        }} onClick={() => {
          dispatch(clear());
        }}>Clear</button>
        <button style={{
          color: "white"
        }} onClick={() => {
          getData();
        }}>Get</button> */}
        <div className={style.rankingTitle}>官方榜</div>
        <div className={style.officialRankListContainer}>
          {/* {
            officialRankListData.length > 0 && officialRankListData.map((item: RankTop5Props, index: number) => {
              return (
                <RankTop5 {...item} key={index} />
                // <CallBackRT5 {...item} key={index} />
              )
            })
          } */}
          {
            RankTop
          }
        </div>
        <div className={style.rankingTitle}>全球榜</div>
        <div className={style.globalRankListContainer}>
          {
            globalRankList.length > 0 && globalRankList.map((item: any, index: number) => {
              return (
                <RankItem key={index} rankName={item.name} imgSrc={item.coverImgUrl} rankUpdateTime={new Date().toLocaleDateString()} onClick={() => handleSongListOnClick(item.id)} />
              )
            })
          }

        </div>
      </div>
    </div>
  )
}
export default Ranking
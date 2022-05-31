import { Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import getPlaylist from '../../service/getPlaylist'
import RankItem from './components/RankItem'
type Props = {}
const Ranking = (props: Props) => {
  const [rankList, updateRankList]:[any[], Function] = useState([]);
  useEffect(() => {
    const playlist = async () => {
      const { data } = await getPlaylist();
      // const { result } = JSON.parse(data);
      updateRankList(data.list);
      return () => {

      }
    };
    playlist();
  }, []);
  return (
    <div>
      <div>Ranking</div>
      {
        rankList.map((item, index) => {
          return (
            <RankItem key={index} rankName={item.name} imgSrc={item.coverImgUrl} rankUpdateTime={new Date().toLocaleDateString()}/>
          )
        })
      }
    </div>
  )
}

export default Ranking
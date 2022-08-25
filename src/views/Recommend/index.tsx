import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getPersonalized } from "../../api/recommend";
import getSongList from '../../service/getSongList';
import { initSongList, initSong } from '../../states/playerSlice';
import { initRecommendList } from '../../states/rankingSlice';
import { parsePlayCount } from '../../utils/format';
import style from "./index.module.less";
type Props = {}

export default function index({ }: Props) {
  const dispatch = useDispatch();
  const { recommendList } = useSelector((state) => (state as any).ranking, shallowEqual);

  useEffect(() => {
    const fetchData = async () => {
      if (recommendList.length > 0) return;
      const { result } = await getPersonalized(30);
      if (_.isEqual(recommendList, result)) {
        console.log(true)
      } else {
        console.log(false)
        dispatch(initRecommendList(result));
      }
    }
    let flag = setInterval(() => {
      console.log('alive')
    }, 1000)
    return () => {
      clearInterval(flag);
    }
    fetchData();
  }, []);
  const handleSongListOnClick = async (id: number) => {
    const { songs } = await getSongList(id);
    dispatch(initSongList(songs));
  };
  return (
    <div className={style['recommend']}>
      <div className={style['song-list-content']}>
        {
          recommendList.length > 0 && recommendList.map(({ name, picUrl, playCount, id }: any, index: React.Key) => {
            return (
              <div key={index} className={style['song-list']} onClick={() => handleSongListOnClick(id)}>
                <div>
                  <span>{parsePlayCount(playCount)}</span>
                  <img src={picUrl} style={{ width: "140px", height: "140px" }} alt="" />
                </div>
                <span>
                  {
                    name
                  }
                </span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

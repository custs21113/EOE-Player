import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPersonalized } from "../../api/recommend";
import getSongList from '../../service/getSongList';
import { initSonglist, initSong } from '../../states/playerReducer';

import style from "./index.module.less";
type Props = {}

function index({ }: Props) {
  const dispatch = useDispatch();
  const [data, updateData] = useState([]);
  const { songList } = useSelector((state) => (state as any).player);
  const song = useSelector((state) => (state as any).song);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPersonalized();
      const { result } = JSON.parse(data);
      updateData(result);
      return () => {

      }
    }
    fetchData();
  }, []);
  const hanleSonglistOnClick = async (id: string) => {
    const { songs } = await getSongList(id);
    // dispatch(initSonglist(songs));
  };
  useEffect(() => {
    if (songList.length !== 0) {
      const song = songList[0];
      const { al, ar, mv, id, dt } = song;
      dispatch(initSong({
        id: id,
        dt: dt,
        singer: ar.map((item: any) => item.name).join("/"),
        songName: al.name,
        picUrl: al.picUrl,
        index: 0
      }));
    }
  }, [songList])
  return (
    <div className={style['recommend']}>
      <div className={style['song-list-content']}>
        {
          data.length > 0 && data.map(({ name, picUrl, playCount, id }, index) => {
            return (
              <div key={index} className={style['song-list']} onClick={() => hanleSonglistOnClick(id)}>
                <div>
                  <span>{playCount}</span>
                  <img src={picUrl} style={{ width: "140px", height: "140px" }} alt="" />
                </div>
                <span>
                  {
                    name
                  }</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default index;
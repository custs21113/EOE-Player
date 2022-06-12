import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getPersonalized } from "../../api/recommend";
import getSongList from '../../service/getSongList';
import { initSongList, initSong } from '../../states/playerSlice';
import { parsePlayCount } from '../../utils/format';
import style from "./index.module.less";
type Props = {}

function index({ }: Props) {
  const dispatch = useDispatch();
  let [data, updateData] = useState([]);
  const { songList } = useSelector((state) => (state as any).player);

  useEffect(() => {
    const fetchData = async () => {
      const { result } = await getPersonalized(30);
      console.log(result);
      updateData(result);
      return () => {

      }
    }
    fetchData();
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
    <div className={style['recommend']}>
      <div className={style['song-list-content']}>
        {
          data.length > 0 && data.map(({ name, picUrl, playCount, id }, index) => {
            return (
              <div key={index} className={style['song-list']} onClick={() => handleSongListOnClick(id)}>
                <div>
                  <span>{parsePlayCount(playCount)}</span>
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
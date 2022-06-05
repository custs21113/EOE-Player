import React, { forwardRef, useEffect, useState } from 'react';
import style from './index.module.less';
import { search, SearchType } from '../../../../service/search';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../states/store';
import { addSongToPlayList } from '../../../../states/playerSlice';


type Props = {
  keyword: string
}
const Index = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { keyword } = props;
  const [songs, updateSongs] = useState<any>([]);
  const [songCount, updateSongCount] = useState<number>(0);
  async function handleSearch(keyword: string, type: string = SearchType.SingleSong) {
    const { songCount = 0, songs = [] } = await search(keyword, type);
    updateSongs(songs);
    updateSongCount(songCount);
  }
  useEffect(() => {
    if (keyword !== "") {
      handleSearch(keyword);
    } else {
      updateSongs([]);
      updateSongCount(0);
    }
  }, [keyword]);
  function handleSongClick(song: any) {
    console.log(song);
    const {id, dt, ar, al } = song;
    dispatch(addSongToPlayList({
      id: id,
      dt: dt,
      singer: ar.map((item: any) => item.name).join("/"),
      songName: al.name,
      picUrl: al.picUrl,
    }));
  };
  return (
    <div>
      {
        songs?.map((item: any, index: number) => {
          const { name, ar, id, dt, al } = item;
          return (
            <div key={index} onClick={() => handleSongClick(item)}>
              {name}-{ar.map((item: any) => item.name).join("/")}
            </div>
          )
        })
      }
    </div>
  )
}

export default Index;
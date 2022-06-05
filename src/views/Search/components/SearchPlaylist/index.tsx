import React, { useEffect, useState } from 'react';
import style from './index.module.less';
import { search, SearchType } from '../../../../service/search';


type Props = {
  keyword: string
}
const Index = (props: Props) => {
  const { keyword } = props;
  const [playlists, updatePlaylists] = useState<any>([]);
  const [playlistCount, updatePlaylistCount] = useState<number>(0);
  async function handleSearch(keyword: string, type: string = SearchType.PlayList) {
    const { playlistCount = 0, playlists = [] } = await search(keyword, type);
    updatePlaylists(playlists);
    updatePlaylistCount(playlistCount);
  }
  useEffect(() => {
    if (keyword !== "") {
      handleSearch(keyword);
    } else {
      updatePlaylists([]);
      updatePlaylistCount(0);
    }
  }, [keyword]);

  return (
    <div>
      {
        playlists?.map((item: any, index: number) => {
          const { name } = item;
          return (
            <div key={index}>
              {name}
            </div>
          )
        })
      }
    </div>     
  ) 
}

export default Index 
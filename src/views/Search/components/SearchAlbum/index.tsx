import React, { useEffect, useState } from 'react';
import style from './index.module.less';
import { search, SearchType } from '../../../../service/search';


type Props = {
  keyword: string
}
const Index = (props: Props) => {
  const { keyword } = props;
  const [albums, updateAblums] = useState<any>([]);
  const [albumCount, updateAlbumCount] = useState<number>(0);
  async function handleSearch(keyword: string, type: string = SearchType.Album) {
    const { albumCount = 0, albums = [] } = await search(keyword, type);
    updateAblums(albums);
    updateAlbumCount(albumCount);
  }
  useEffect(() => {
    if (keyword !== "") {
      handleSearch(keyword);
    } else {
      updateAblums([]);
      updateAlbumCount(0);
    }
  }, [keyword]);

  return (
    <div>
      {
        albums?.map((item: any, index: number) => {
          const { name, artists } = item;
          return (
            <div key={index}>
              {name}-{artists.map((item: any) => item.name).join("/")}
            </div>
          )
        })
      }
    </div>
  )
}

export default Index
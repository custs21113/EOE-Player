import React, { useEffect, useState } from 'react';
import style from './index.module.less';
import { search, SearchType } from '../../../../service/search';


type Props = {
  keyword: string
}
const Index = (props: Props) => {
  const { keyword } = props;
  const [artists, updateArtists] = useState<any>([]);
  const [artistCount, updateArtistCount] = useState<number>(0);
  async function handleSearch(keyword: string, type: string = SearchType.Artist) {
    const { artistCount = 0, artists = [] } = await search(keyword, type);
    updateArtists(artists);
    updateArtistCount(artistCount);
  }
  useEffect(() => {
    if (keyword !== "") {
      handleSearch(keyword);
    } else {
      updateArtists([]);
      updateArtistCount(0);
    }
  }, [keyword]);

  return (
    <div>
      {
        artists?.map((item: any, index: number) => {
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
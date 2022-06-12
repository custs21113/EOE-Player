import React, { forwardRef, useRef, useState } from 'react'
import { Input, InputRef, Tabs } from 'antd';
import style from './index.module.less';
import { SearchOutlined } from '@ant-design/icons';
import { SearchType } from '../../service/search';
import { SearchAlbum, SearchPlaylist, SearchArtist, SearchSingleSong } from './components'

const { TabPane } = Tabs;

const prefix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}></SearchOutlined>
)
type Props = {}

const Index = (props: Props, audioRef: any) => {
  const keywordRef = useRef<InputRef | null>(null);
  const [keyword, updateKeyword] = useState<string>("");

  return (
    <div className={style.searchPage}>
      <div className={style.searchContent}>
        <Input prefix={prefix} type="text" style={{ width: "100%" }} ref={keywordRef} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            updateKeyword(keywordRef.current?.input?.value ? keywordRef.current?.input?.value : "")
          }
        }} />
        <Tabs defaultActiveKey="1" style={{
          color: "white",
          cursor: "default"
        }}>
          <TabPane tab="歌曲" key={SearchType.SingleSong}>
            <SearchSingleSong keyword={keyword} />
          </TabPane>
          <TabPane tab="专辑" key={SearchType.Album}>
            <SearchAlbum keyword={keyword} />
          </TabPane>
          <TabPane tab="歌手" key={SearchType.Artist}>
            <SearchArtist keyword={keyword} />
          </TabPane>
          <TabPane tab="歌单" key={SearchType.PlayList}>
            <SearchPlaylist keyword={keyword} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Index;
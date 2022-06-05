import Search from 'antd/lib/transfer/search';
import request from '../utils/request';

export enum SearchType  {
  SingleSong = "1",
  Album = "10",
  Artist = "100",
  PlayList = "1000",
  User = "1002",
  MV = "1004",
  Lyric = "1006",
  Radio = "1009",
  Video = "1014",
  All = "1018",
  Voice = "2000"
} 
export async function search(keyword: string, type: string = SearchType.SingleSong) {
  const { data: { result }  } = await request(`cloudsearch?keywords=${keyword}&type=${type}`);
  return result;
}
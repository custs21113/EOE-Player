import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Lyric from "lyric-parser";
import getLyric from "../service/getLyric";
// import { getSettleSinger } from "../service/singerAndDjradio";

interface InitialStateProps {
  loop: number;
  volume: number;
  picUrl: string;
  songName: string;
  singer: string;
  dt: number;
  current: number;
  id: number;
  index: number;
  songlist: Array<any>;
  lyric: string|null;
}
export const initialState: InitialStateProps = {
  loop: 0,
  volume: 30,
  picUrl: "test",
  songName: "test",
  singer: "test",
  dt: 0,
  current: 0,
  id: 0,
  index: 0,
  songlist: [],
  lyric: null,
};
export const getLyricService = createAsyncThunk("player/getLyricService", async (id: number) => {
  try {
    const { data: { lrc: { lyric = "" } } } = await getLyric(id);
    return lyric;
  } catch (error) {
    console.log(error);
  }
});

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    clearPlayer: (state) => {
      console.log("清空reduxjs/toolkit使用axios从服务器上获取的数据");
      state = {
        loop: 0,
        volume: 30,
        picUrl: "test",
        songName: "test",
        singer: "test",
        dt: 0,
        current: 0,
        id: 0,
        index: 0,
        songlist: [],
        lyric: null,
      };
      return state;
    },
    initSong: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    initPlayer: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    initSonglist: (state, action) => {
      state = {
        ...state,
        songlist: action.payload,
      };
      return state;
    },
    initLyric: (state, action) => {
      const { lyric } = action.payload;

      state = {
        ...state,
        lyric: lyric
      }
      return state;
    },
    changeVolume: (state, action) => {
      let { volume } = action.payload;
      state = {
        ...state,
        volume,
      };
      return state;
    },
    changeLoop: (state, action) => {
      let { loop } = action.payload;
      loop = loop >= 2 ? 0 : loop + 1;
      state = {
        ...state,
        loop,
      };
      return state;
    },
    nextSong: (state: InitialStateProps) => {
      const { index, songlist } = state;
      if (songlist.length !== 0) {
        const currentIndex = (index + 1) % songlist.length;
        const { al, ar, mv, id, dt } = songlist[currentIndex];
        state = {
          ...state,
          id: id,
          dt: dt,
          singer: ar.map((item: any) => item.name).join("/"),
          songName: al.name,
          picUrl: al.picUrl,
          index: currentIndex,
        };
        return state;
      } else {
        return state;
      }
    },
    prevSong: (state) => {
      const { index, songlist } = state;
      if (songlist.length !== 0) {
        const currentIndex = (index + songlist.length - 1) % songlist.length;
        const { al, ar, mv, id, dt } = songlist[currentIndex];
        state = {
          ...state,
          id: id,
          dt: dt,
          singer: ar.map((item: any) => item.name).join("/"),
          songName: al.name,
          picUrl: al.picUrl,
          index: currentIndex,
        };
        return state;
      } else {
        return state;
      }
    },
  },
  extraReducers(builder) {
    builder
    .addCase(getLyricService.fulfilled, (state, action) => {
      state = {
        ...state,
        lyric: action.payload
      };
      return state;
    })
  }
  // extraReducers: {
  //   [getLyricService.fulfilled.toString()]: (state: InitialStateProps, action: any) => {
  //       state.lyric = action?.payload?.lyric;
  //       return state;
  //   },
  //   [getLyricService.rejected.toString()]: (state: InitialStateProps, action: any) => {
  //       state.lyric = ""
  //       return state;
  //   }
  // },
});

export const {
  clearPlayer,
  initPlayer,
  initSong,
  initSonglist,
  changeVolume,
  changeLoop,
  prevSong,
  nextSong,
  initLyric,
} = playerSlice.actions;
export default playerSlice.reducer;

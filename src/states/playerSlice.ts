import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Lyric from "lyric-parser";
import getLyric from "../service/getLyric";

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
  songList: Array<any>;
  lyric: string;
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
  songList: [],
  lyric: "",
};
export const getLyricService = createAsyncThunk(
  "player/getLyricService",
  async (id: number) => {
    try {
      const {
        data: {
          lrc: { lyric = "" },
        },
      } = await getLyric(id);
      return lyric;
    } catch (error) {
      console.log(error);
    }
  }
);

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
        songList: [],
        lyric: "",
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
    initSongList: (state, action) => {
      state = {
        ...state,
        songList: action.payload,
      };
      return state;
    },
    initLyric: (state, action) => {
      const { lyric } = action.payload;

      state = {
        ...state,
        lyric: lyric,
      };
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
      const { index, songList } = state;
      if (songList.length !== 0) {
        const currentIndex = (index + 1) % songList.length;
        const { al, ar, mv, id, dt } = songList[currentIndex];
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
      const { index, songList } = state;
      if (songList.length !== 0) {
        const currentIndex = (index + songList.length - 1) % songList.length;
        const { al, ar, mv, id, dt } = songList[currentIndex];
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
    randomPlay: (state) => {
      const { index, songList } = state;
      if (songList.length !== 0) {
        const currentIndex = Math.floor(Math.random() * songList.length);
        const { al, ar, mv, id, dt } = songList[currentIndex];
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
    builder.addCase(getLyricService.fulfilled, (state, action) => {
      state = {
        ...state,
        lyric: action.payload,
      };
      return state;
    });
  },
  // extraReducers: {
  //   [getLyricService.fulfilled.toString()]: (state: InitialStateProps, action: any) => {
  //       console.log(action)
  //       state.lyric = action?.payload;
  //       return state;
  //   },
  //   [getLyricService.rejected.toString()]: (state: InitialStateProps, action: any) => {
  //     console.log(action)
  //       state.lyric = ""
  //       return state;
  //   }
  // },
});

export const {
  clearPlayer,
  initPlayer,
  initSong,
  initSongList,
  changeVolume,
  changeLoop,
  prevSong,
  nextSong,
  randomPlay,
  initLyric,
} = playerSlice.actions;
export default playerSlice.reducer;

import { CHANGE_LOOP, CHANGE_VOLUME, CLEAR_PLAYER, INIT_LYRIC, INIT_PLAYER, INIT_SONG, INIT_SONG_LIST, NEXT_SONG, PREV_SONG } from "./constant";
import Lyric from "lyric-parser";
import getLyric from "../service/getLyric";
import { Dispatch } from "react";
import { AnyAction } from "redux";

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
  lyric: string | null;
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
  lyric: null,
};
const actions = {
  clearPlayer: (state: InitialStateProps) => {
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
      lyric: null,
    };
    return state;
  },
  initSong: (state: InitialStateProps, action: any) => {
    state = {
      ...state,
      ...action.payload,
    };
    return state;
  },
  initPlayer: (state: InitialStateProps, action: any) => {
    state = {
      ...state,
      ...action.payload,
    };
    return state;
  },
  initSonglist: (state: InitialStateProps, action: any) => {
    state = {
      ...state,
      songList: action.payload,
    };
    return state;
  },
  initLyric: (state: InitialStateProps, action: any) => {
    const { lyric } = action.payload;

    state = {
      ...state,
      lyric: lyric,
    };
    return state;
  },
  changeVolume: (state: InitialStateProps, action: any) => {
    let { volume } = action.payload;
    state = {
      ...state,
      volume,
    };
    return state;
  },
  changeLoop: (state: InitialStateProps, action: any) => {
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
  prevSong: (state: InitialStateProps) => {
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
};
export const getLyricThunk = (id: number) => {
  return async (dispatch: any) => {
    try {
      const {
        data: {
          lrc: { lyric = "" },
        },
      } = await getLyric(id);
      return dispatch({
        type: INIT_LYRIC,
        lyric,
      });
    } catch (error) {
      console.log("INIT_LYRIC", error);
    }
  };
};
export const nextSong = () => {
  return async (dispatch: any) => {
    return dispatch({
      type: NEXT_SONG
    })
  }
};
export const prevSong = () => {
  return async (dispatch: any) => {
    return dispatch({
      type: PREV_SONG
    })
  }
};
export const changeLoop = (loop: number) => {
  return async (dispatch: any) => {
    return dispatch({
      type: CHANGE_LOOP,
      loop
    })
  }
};
export const changeVolume = (volume: number) => {
  return async (dispatch: any) => {
    return dispatch({
      type: CHANGE_VOLUME,
      volume
    })
  }
};
export const initLyric = (id: number) => {
  return async (dispatch: any) => {
    try {
      const {
        data: {
          lrc: { lyric = "" },
        },
      } = await getLyric(id);
      return dispatch({
        type: INIT_LYRIC,
        lyric,
      });
    } catch (error) {
      console.log("INIT_LYRIC", error);
    }
  };
};

export const initSong = (state: InitialStateProps) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: INIT_SONG,
      state: {...state}
    })
  };
};
export const initPlayer = (state: InitialStateProps) => {
  return async (dispatch: any) => {
    dispatch({
      type: INIT_PLAYER,
      state: {...state}
    })
  };
};

export const initSonglist = (state: InitialStateProps) => {
  return async (dispatch: any) => {
    dispatch({
      type: INIT_SONG_LIST,
      state: {...state,}
    })
  };
};
export default function reducer(
  state: InitialStateProps = initialState,
  action: any
) {
  // let { songIndex} = action;
  switch (action.type) {
    case CLEAR_PLAYER: {
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
        lyric: null,
      };
      return state;
    }
    case INIT_PLAYER: {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    }
    case INIT_LYRIC: {
      const { lyric } = action.payload;
  
      state = {
        ...state,
        lyric: lyric,
      };
      return state;
    }
    case INIT_SONG_LIST: {
      state = {
        ...state,
        songList: action.payload,
      };
      return state;
    }
    case INIT_SONG: {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    }
    case NEXT_SONG: {
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
    }
    case PREV_SONG: {
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
    }
    case CHANGE_LOOP: {
      let { volume } = action.payload;
      state = {
        ...state,
        volume,
      };
      return state;
    }
    case CHANGE_VOLUME: {
      let { loop } = action.payload;
      loop = loop >= 2 ? 0 : loop + 1;
      state = {
        ...state,
        loop,
      };
      return state;
    }
    default:
      console.log("state", state);
      return state;
  }
}
// export const {
//   clearPlayer,
//   initPlayer,
//   initSong,
//   initSonglist,
//   changeVolume,
//   changeLoop,
//   prevSong,
//   nextSong,
//   initLyric,
// } = actions;

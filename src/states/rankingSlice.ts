import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Lyric from "lyric-parser";
import getLyric from "../service/getLyric";

interface InitialStateProps {
  globalRankList: Array<any>;
  officialRankListData: Array<any>;
  recommendList: Array<any>;
}

export const initialState: InitialStateProps = {
  globalRankList: localStorage.getItem('globalRankList') ? JSON.parse(localStorage.getItem('globalRankList') as any) : [],
  officialRankListData: localStorage.getItem('officialRankListData') ? JSON.parse(localStorage.getItem('officialRankListData') as any) : [],
  recommendList: localStorage.getItem('recommendList') ? JSON.parse(localStorage.getItem('recommendList') as any) : [],
};

export const rankingSlice = createSlice({
  name: "ranking",
  initialState,
  reducers: {
    clear: (state) => {
      state = {
        globalRankList: [],
        officialRankListData: [],
        recommendList: [],
      };
      localStorage.removeItem('globalRankList');
      localStorage.removeItem('officialRankListData');
      localStorage.removeItem('recommendList');
      return state;
    },
    initGlobalRankList: (state, action) => {
      localStorage.setItem('globalRankList', JSON.stringify(action.payload || []));
      state = {
        ...state,
        globalRankList: action.payload,
      };
      return state;
    },
    initOfficialRankListData: (state, action) => {
      localStorage.setItem('officialRankListData', JSON.stringify(action.payload || []));
      state = {
        ...state,
        officialRankListData: action.payload
      };
      return state;
    },
    initRecommendList: (state, action) => {
      localStorage.setItem('recommendList', JSON.stringify(action.payload || []));
      state = {
        ...state,
        recommendList: action.payload,
      };
      return state;
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(getLyricService.fulfilled, (state, action) => {
  //     state = {
  //       ...state,
  //       lyric: action.payload,
  //     };
  //     return state;
  //   });
  // },
  // extraReducers: {
  //   [getLyricService.fulfilled.toString()]: (state: InitialStateProps, action: any) => {
  //       state.lyric = action?.payload;
  //       return state;
  //   },
  //   [getLyricService.rejected.toString()]: (state: InitialStateProps, action: any) => {
  //       state.lyric = ""
  //       return state;
  //   }
  // },
});

export const {
  clear,
  initGlobalRankList,
  initOfficialRankListData,
  initRecommendList,
} = rankingSlice.actions;
export default rankingSlice.reducer;

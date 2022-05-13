import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getSettleSinger } from "../service/singerAndDjradio";
export const initialState = {
  songlist: [],
};
export const getSinger = createAsyncThunk("getSettleSinger", async () => {
  try {
    // let res = await getSettleSinger()
    // return res.data
  } catch (error) {
    console.log(error);
  }
});
export const songlistSlice = createSlice({
  name: "songlist",
  initialState,
  reducers: {
    clearSonglist: (state) => {
      console.log("清空reduxjs/toolkit使用axios从服务器上获取的数据");
      state = {
        songlist: [],
      };
    },
    initSonglist: (state, action) => {
      state = {
        songlist: action.payload,
      };
      return state;
    },
  },
  extraReducers: {
    // [getSinger.fulfilled]: (state, action) => {
    //     state.singer = action?.payload?.artists;
    //     return state;
    // },
    // [getSinger.rejected]: (state, action) => {
    //     return state.singer = []
    // }
  },
});

export const { clearSonglist, initSonglist } = songlistSlice.actions;
export default songlistSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getSettleSinger } from "../service/singerAndDjradio";
interface InitialStateProps {
    id: string | null;
    picUrl: string | null;
    songName: string | null;
    singer: string | null;
    dt: number;
    index: number | null;
}
export const initialState: InitialStateProps = {
    id: null,
    picUrl: "tset",
    songName: "test",
    singer: "test",
    dt: 0,
    index: null,
};
export const getSinger = createAsyncThunk('getSettleSinger', async () => {
    try {
        // let res = await getSettleSinger()
        // return res.data
    } catch (error) {
        console.log(error)
    }
})
export const counterSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        clearSingers: (state) => {
            console.log('清空reduxjs/toolkit使用axios从服务器上获取的数据')
            state = {
                id: null,
                picUrl: "tset",
                songName: "test",
                singer: "test",
                dt: 0,
                index: null,
          };
        },
        initSong: (state, action) => {
            state = {
                ...state, 
                ...action.payload
            }
            return state
        }
    },
    extraReducers: {
        // [getSinger.fulfilled]: (state, action) => {
        //     state.singer = action?.payload?.artists;
        //     return state;
        // },
        // [getSinger.rejected]: (state, action) => {
        //     return state.singer = []
        // }
    }
})

export const { clearSingers, initSong } = counterSlice.actions;
export default counterSlice.reducer;
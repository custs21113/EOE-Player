import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// First, create the thunk

export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number, thunkAPI) => {
    const response = await userAPI(userId)
    return response
  }
)

interface UsersState {
  entities: any []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  entities: [],
  loading: 'idle',
} as UsersState

// Then, handle actions in your reducers:
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action?.payload as any)
    })
  },
});
export const {
  
} = testSlice.actions;
export default testSlice.reducer;
// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))
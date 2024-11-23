import { createSlice } from '@reduxjs/toolkit';
import { ITypes } from '../../types';
import { RootState } from '../../app/store.ts';
import { fetchPostCategories } from '../store/thunks/allThuks.ts';


interface dishState {
  category: ITypes[]
  isFetching: boolean,
  error: boolean,
}

const initialState: dishState = {
  category: [],
  isFetching: false,
  error: false,
};

export const categories = (state: RootState) => state.category.category;

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers:{

  },
  extraReducers:(builder) => {
    builder
      .addCase(fetchPostCategories.fulfilled, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchPostCategories.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(fetchPostCategories.pending, (state) => {
        state.isFetching = false;
        state.error = true;
      });
  }

});

export const categoryReducer = categorySlice.reducer;
export const {} = categorySlice.actions;

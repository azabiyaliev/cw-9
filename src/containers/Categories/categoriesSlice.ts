import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../types';
import { RootState } from '../../app/store.ts';
import {
  fetchDeleteCategory,
  fetchGetCategories,
  fetchPostCategories,
  fetchPutCategory
} from '../store/thunks/allThuks.ts';


interface dishState {
  category: ICategory[],
  pickedCategory: ICategory | null,
  isFetching: boolean,
  error: boolean,
}

const initialState: dishState = {
  category: [],
  pickedCategory: null,
  isFetching: false,
  error: false,
};

export const categories = (state: RootState) => state.category.category;
export const pickedCategory = (state: RootState) => state.category.pickedCategory;

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers:{
    editCategory: (state, action: PayloadAction<ICategory>) => {
      state.pickedCategory = action.payload;
    },
    clearModal: (state) => {
      state.pickedCategory = null;
    },
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
      })
      .addCase(fetchGetCategories.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchGetCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
        state.isFetching = true;
        state.category = action.payload;
      })
      .addCase(fetchGetCategories.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(fetchPutCategory.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchPutCategory.fulfilled, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPutCategory.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(fetchDeleteCategory.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchDeleteCategory.fulfilled, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchDeleteCategory.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      });
  }
});

export const categoryReducer = categorySlice.reducer;
export const {editCategory, clearModal } = categorySlice.actions;

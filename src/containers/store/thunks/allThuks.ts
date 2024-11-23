import { createAsyncThunk,  } from '@reduxjs/toolkit';
import axiosAPI from '../../../axiosAPI.ts';
import { ICategories, ICategory, ITypes } from '../../../types';

export const fetchPostCategories = createAsyncThunk("postDish/fetchPostDish", async (form: ITypes) => {
  await axiosAPI.post("categories.json", {...form});
});

export const fetchGetCategories = createAsyncThunk<ICategory[]>("getCategories/fetchGetCategories", async () => {
  const response: {data: ICategories | null} = await axiosAPI.get<ICategories | null>("categories.json");
  if (response.data) {
    const categoriesObjects = response.data;
    return Object.keys(categoriesObjects).map((categoryKey) => {
      return {
        ...categoriesObjects[categoryKey],
        id: categoryKey,
      };
    });
  }
  return [];
});

export const fetchPutCategory = createAsyncThunk<ICategory, {id: string, edits: ITypes}>("putCategory/fetchPutCategory",
  async ({id, edits}: {id: string, edits: ITypes}) => {
   const response = await axiosAPI.put(`categories/${id}.json`, edits);
   return response.data;
});

export const fetchDeleteCategory = createAsyncThunk<void, string>("deleteCategory/fetchDeleteCategory", async (categoryId) => {
  await axiosAPI.delete(`categories/${categoryId}.json`);
});


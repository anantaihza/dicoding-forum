import { createSlice } from '@reduxjs/toolkit';
import getCategories from './categoriesThunk';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    listCategory: null,
    activeCategory: null,
    isLoading: false,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCategory = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setActiveCategory } = categorySlice.actions;

export default categorySlice.reducer;

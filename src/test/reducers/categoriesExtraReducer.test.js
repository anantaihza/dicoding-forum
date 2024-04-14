import { expect, it, describe } from 'vitest';
import categoriesReducer from '../../redux/features/categories/categoriesSlice';
import getCategories from '../../redux/features/categories/categoriesThunk';

describe('Categories reducer test', () => {
  const initialState = {
    listCategory: null,
    activeCategory: null,
    isLoading: false,
  };

  describe('getCategories', () => {
    it('Pending: Should return {isLoading = true, listCategory = null}', () => {
      const state = initialState;
      const action = getCategories.pending;

      const nextState = categoriesReducer(state, action);

      expect(nextState).toEqual({
        listCategory: null,
        activeCategory: null,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading = false, listCategory = all category}', () => {
      const state = initialState;
      const action = getCategories.fulfilled({
        isLoading: false,
        data: ['redux', 'react', 'vue'],
      });

      const nextState = categoriesReducer(state, action);

      expect(nextState).toEqual({
        listCategory: ['redux', 'react', 'vue'],
        activeCategory: null,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, listCategory = null}', () => {
      const state = initialState;
      const action = getCategories.fulfilled({
        isLoading: false,
        data: null,
      });

      const nextState = categoriesReducer(state, action);

      expect(nextState).toEqual({
        listCategory: null,
        activeCategory: null,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, listCategory = null}', () => {
      const state = initialState;
      const action = getCategories.rejected({
        isLoading: false,
        data: null,
      });

      const nextState = categoriesReducer(state, action);

      expect(nextState).toEqual({
        listCategory: null,
        activeCategory: null,
        isLoading: false,
      });
    });
  });
});

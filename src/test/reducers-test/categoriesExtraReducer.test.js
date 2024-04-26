import { expect, it, describe } from 'vitest';
import categoriesReducer from '../../redux/features/categories/categoriesSlice';
import getCategories from '../../redux/features/categories/categoriesThunk';

/**
 *
 * SKENARIO TESTING
 *
 * Extra Reducer: categoriesReducer
 *
 * 1. getCategories
 *    - Pending: Should return {isLoading = true, listCategory = null}
 *    - Fulfilled(success): Should return {isLoading = false, listCategory = all category}
 *    - Fulfilled(failed): Should return {isLoading = false, listCategory = null}
 *    - Rejected: Should return {isLoading = false, listCategory = null}
 *
 */
describe('Categories reducer test', () => {
  const initialState = {
    listCategory: null,
    activeCategory: null,
    isLoading: false,
  };

  describe('getCategories', () => {
    it('Pending: Should return {isLoading = true, listCategory = null}', () => {
      // Arrange
      const state = initialState;
      const action = getCategories.pending;

      // Action
      const nextState = categoriesReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        listCategory: null,
        activeCategory: null,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading = false, listCategory = all category}', () => {
      // Arrange
      const state = initialState;
      const action = getCategories.fulfilled({
        isLoading: false,
        data: ['redux', 'react', 'vue'],
      });

      // Action
      const nextState = categoriesReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        listCategory: ['redux', 'react', 'vue'],
        activeCategory: null,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, listCategory = null}', () => {
      // Arrange
      const state = initialState;
      const action = getCategories.fulfilled({
        isLoading: false,
        data: null,
      });

      // Action
      const nextState = categoriesReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        listCategory: null,
        activeCategory: null,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, listCategory = null}', () => {
      // Arrange
      const state = initialState;
      const action = getCategories.rejected({
        isLoading: false,
        data: null,
      });

      // Action
      const nextState = categoriesReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        listCategory: null,
        activeCategory: null,
        isLoading: false,
      });
    });
  });
});

import { expect, it, describe } from 'vitest';
import categoriesReducer, {
  setActiveCategory,
} from '../../redux/features/categories/categoriesSlice';

/**
 *
 * SKENARIO TESTING
 *
 * Reducer: categoriesReducer
 *
 * - Should return the initial state when no action
 * - Should return a new active category
 *
 */
describe('Categories reducers test', () => {
  const initialState = {
    listCategory: null,
    activeCategory: null,
    isLoading: false,
  };

  it('Should return the initial state when no action', () => {
    // Arrange
    const state = undefined;
    const action = {};

    // Action
    const nextState = categoriesReducer(state, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('Should return a new active category', () => {
    // Arrange
    const newActiveCategory = 'test';
    const action = setActiveCategory(newActiveCategory);

    // Action
    const nextState = categoriesReducer(initialState, action);

    // Assert
    expect(nextState.activeCategory).toEqual(newActiveCategory);
  });
});

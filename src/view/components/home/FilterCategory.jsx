import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../../../redux/features/categories/categoriesSlice';

export default function FilterCategory() {
  const dispatch = useDispatch();
  const { listCategory, activeCategory } = useSelector(
    (state) => state.categories
  );

  const categoryHandler = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === 'All') {
      dispatch(setActiveCategory(null));
    } else {
      dispatch(setActiveCategory(selectedCategory));
    }
  };

  return (
    <label
      className="form-control w-full max-w-xs block xl:hidden"
      htmlFor="category"
    >
      <div className="label">
        <span className="label-text">Filter Kategori</span>
      </div>
      <select
        id="category"
        className="select select-sm w-full max-w-xs bg-white"
        value={activeCategory || 'All'}
        onChange={categoryHandler}
      >
        <option value="All">All</option>

        {listCategory?.map((category) => (
          <option key={category} value={category}>{`#${category}`}</option>
        ))}
      </select>
    </label>
  );
}

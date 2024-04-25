import React from 'react';
import PropType from 'prop-types';
import { useDispatch } from 'react-redux';
import { setActiveCategory } from '../../../redux/features/categories/categoriesSlice';

export default function ButtonCategory({ name, isSelected }) {
  const dispatch = useDispatch();

  const categoryHandler = () => {
    if (name === 'All') {
      dispatch(setActiveCategory(null));
    } else {
      dispatch(setActiveCategory(name));
    }
  };

  return (
    <button
      type="button"
      onClick={categoryHandler}
      className={`btn btn-category rounded-full px-4 border-primary hover:bg-primary hover:text-white ${isSelected ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
    >
      {name === 'All' ? (
        <span className="truncate max-w-36">{name}</span>
      ) : (
        <span className="truncate max-w-36">#{name}</span>
      )}
    </button>
  );
}

ButtonCategory.propTypes = {
  /**
   * Category name
   */
  name: PropType.string.isRequired,
  /**
   * Is category selected?
   */
  isSelected: PropType.bool.isRequired,
};

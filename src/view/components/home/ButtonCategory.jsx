import React from 'react';
import PropType from 'prop-types';

export default function ButtonCategory({ name }) {
  return (
    <button
      type="button"
      className="btn rounded-full px-4 bg-transparent text-primary border-primary hover:bg-primary hover:text-white"
    >
      <span className="truncate max-w-36">{name}</span>
    </button>
  );
}

ButtonCategory.propTypes = {
  name: PropType.string.isRequired,
};

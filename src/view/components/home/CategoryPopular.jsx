import React from 'react';
import { useSelector } from 'react-redux';
import ButtonCategory from './ButtonCategory';

export default function CategoryPopular() {
  const { listCategory, activeCategory } = useSelector(
    (state) => state.categories
  );

  return (
    <div className="card w-96 bg-white">
      <div className="card-body">
        <h3 className="card-title text-neutral">Kategori Popular</h3>
        <div className="flex flex-wrap gap-3 mt-4">
          <ButtonCategory name="All" isSelected={activeCategory === null} />
          {listCategory?.map((category) => (
            <ButtonCategory
              key={category}
              name={category}
              isSelected={activeCategory === category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

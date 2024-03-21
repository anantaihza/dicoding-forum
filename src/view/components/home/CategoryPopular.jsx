import React from 'react';
import ButtonCategory from './ButtonCategory';

export default function CategoryPopular() {
  return (
    <div className="card w-96 bg-white">
      <div className="card-body">
        <h3 className="card-title text-neutral">Kategori Popular</h3>
        <div className="flex flex-wrap gap-3 mt-4">
          <ButtonCategory name="Semua" />
          <ButtonCategory name="General" />
          <ButtonCategory name="Redux react" />
          <ButtonCategory name="Wadux" />
          <ButtonCategory name="Penjahat" />
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function CategoryPopular() {
  return (
    <div className="card w-96 bg-white">
      <div className="card-body">
        <h3 className="card-title text-neutral">Kategori Popular</h3>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn rounded-full px-4 bg-transparent text-primary border-primary hover:bg-primary hover:text-white"
          >
            Semua
          </button>
          
        </div>
      </div>
    </div>
  );
}

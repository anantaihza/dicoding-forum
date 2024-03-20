import React from 'react';

export default function ButtonCreate() {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary text-white rounded-full px-6 poppins-semibold"
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        + Buat
      </button>
      <dialog id="my_modal_3" className="modal backdrop-blur-md bg-white/15">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button
              type="submit"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Buat Diskusi Baru</h3>
          <form action="" className="py-8 px-2">
            <input
              type="text"
              placeholder="Judul Diskusi"
              className="input input-bordered input-primary w-full mb-4"
            />
            <input
              type="text"
              placeholder="Kategori"
              className="input input-bordered input-primary w-full mb-4"
            />
            <textarea
              className="textarea textarea-primary w-full mb-4"
              placeholder="Ingin diskusi apa?"
            />
            <button
              type="submit"
              className="btn btn-block btn-primary text-white"
            >
              Buat
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

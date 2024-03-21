import React from 'react';

export default function ScoreBoard() {
  return (
    <div className="mt-10">
      <h2 className="text-2xl text-neutral poppins-bold mb-5">
        Klansemen Pengguna Aktif
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-primary">
              <th className="w-2">No</th>
              <th>Pengguna</th>
              <th className="text-end">Skor</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>
                <div className="flex items-center gap-5">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                      <span>SY</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-neutral poppins-bold">Doe Hoan</h3>
                    <p className="text-accent">dohoan@gmail.com</p>
                  </div>
                </div>
              </td>
              <td className="text-general poppins-black text-end">20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

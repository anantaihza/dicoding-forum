import React from 'react';
import { useSelector } from 'react-redux';

export default function ScoreBoard() {
  const { listBoard } = useSelector((state) => state.leaderboard);

  return (
    <div className="mt-10">
      <h2 className="text-2xl text-neutral poppins-bold mb-5">
        Klansemen Pengguna Aktif
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-primary">
              <th className="w-2">No</th>
              <th>Pengguna</th>
              <th className="text-end">Skor</th>
            </tr>
          </thead>
          <tbody>
            {listBoard?.map((board, index) => (
              <tr key={board?.user?.id} className="hover">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-5">
                    <div className="avatar placeholder">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={board?.user?.avatar}
                          alt={board?.user?.name}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-neutral poppins-bold">
                        {board?.user?.name}
                      </h3>
                      <p className="text-accent">{board?.user?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="text-general poppins-black text-end">
                  {board?.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

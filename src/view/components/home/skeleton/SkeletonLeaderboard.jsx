import React from 'react';

export default function SkeletonLeaderboard() {
  return (
    <div className="card w-96 bg-white">
      <div className="card-body">
        <div className="skeleton h-6 w-[60%]" />
        <div className="skeleton h-10 w-[60%] container mx-auto mt-4 rounded-full" />
        <div>
          <div className="skeleton h-12 w-[90%] container mx-auto mt-4" />
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td aria-hidden="true">
                  <div className="skeleton h-3 w-full container mx-auto" />
                </td>
                <td aria-hidden="true">
                  <div className="skeleton h-3 w-full container mx-auto" />
                </td>
                <td aria-hidden="true">
                  <div className="skeleton h-3 w-full container mx-auto" />
                </td>
              </tr>
              <tr>
                <td aria-hidden="true">
                  <div className="skeleton h-3 w-full container mx-auto" />
                </td>
                <td aria-hidden="true">
                  <div className="skeleton h-3 w-full container mx-auto" />
                </td>
                <td aria-hidden="true">
                  <div className="skeleton h-3 w-full container mx-auto" />
                </td>
              </tr>
              <tr>
                <td aria-hidden="true">
                  <div className="skeleton h-3 w-full container mx-auto" />
                </td>
                <td aria-hidden="true">
                  <div className="skeleton h-3 w-full container mx-auto" />
                </td>
                <td aria-hidden="true">
                  <div className="skeleton h-3 w-full container mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

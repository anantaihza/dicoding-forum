import React from 'react';

export default function SkeletonScoreBoard() {
  return (
    <div className="mt-10">
      <div className="skeleton h-8 w-[40%]" />
      <div className="mt-5">
        <table className="table">
          <thead>
            <tr className="text-primary">
              <th className="w-2">No</th>
              <th>Pengguna</th>
              <th className="text-end">Skor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th aria-hidden="true">
                <div className="skeleton h-3 w-full container mx-auto" />
              </th>
              <td aria-hidden="true">
                <div className="flex items-center gap-5">
                  <div>
                    <div className="skeleton w-12 h-12 rounded-full shrink-0" />
                  </div>
                  <div>
                    <div className="skeleton h-4 w-96 container mx-auto mb-2" />
                    <div className="skeleton h-3 w-full container mx-auto" />
                  </div>
                </div>
              </td>
              <td aria-hidden="true">
                <div className="skeleton h-3 w-20 container ml-auto" />
              </td>
            </tr>
            <tr>
              <th aria-hidden="true">
                <div className="skeleton h-3 w-full container mx-auto" />
              </th>
              <td aria-hidden="true">
                <div className="flex items-center gap-5">
                  <div>
                    <div className="skeleton w-12 h-12 rounded-full shrink-0" />
                  </div>
                  <div>
                    <div className="skeleton h-4 w-96 container mx-auto mb-2" />
                    <div className="skeleton h-3 w-full container mx-auto" />
                  </div>
                </div>
              </td>
              <td aria-hidden="true">
                <div className="skeleton h-3 w-20 container ml-auto" />
              </td>
            </tr>
            <tr>
              <th aria-hidden="true">
                <div className="skeleton h-3 w-full container mx-auto" />
              </th>
              <td aria-hidden="true">
                <div className="flex items-center gap-5">
                  <div>
                    <div className="skeleton w-12 h-12 rounded-full shrink-0" />
                  </div>
                  <div>
                    <div className="skeleton h-4 w-96 container mx-auto mb-2" />
                    <div className="skeleton h-3 w-full container mx-auto" />
                  </div>
                </div>
              </td>
              <td aria-hidden="true">
                <div className="skeleton h-3 w-20 container ml-auto" />
              </td>
            </tr>
            <tr>
              <th aria-hidden="true">
                <div className="skeleton h-3 w-full container mx-auto" />
              </th>
              <td aria-hidden="true">
                <div className="flex items-center gap-5">
                  <div>
                    <div className="skeleton w-12 h-12 rounded-full shrink-0" />
                  </div>
                  <div>
                    <div className="skeleton h-4 w-96 container mx-auto mb-2" />
                    <div className="skeleton h-3 w-full container mx-auto" />
                  </div>
                </div>
              </td>
              <td aria-hidden="true">
                <div className="skeleton h-3 w-20 container ml-auto" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

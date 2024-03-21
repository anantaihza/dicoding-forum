import React from 'react';
import CommentItem from './CommentItem';

export default function CommentList() {
  return (
    <div className="py-5 md:px-10">
      <h3 className="text-xl text-neutral poppins-bold">Komentar (4)</h3>

      <div className="mt-5">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </div>
    </div>
  );
}

import React from 'react';
import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';

export default function CommentList() {
  const comments = useSelector((state) => state.threads.dataDetail?.comments);

  return (
    <div className="py-5 md:px-10">
      <h3 className="text-xl text-neutral poppins-bold">
        Komentar ({comments?.length})
      </h3>

      <div className="mt-5">
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

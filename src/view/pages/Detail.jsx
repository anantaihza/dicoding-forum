import React from 'react';
import Navbar from '../components/common/Navbar';
import TitleDetail from '../components/detail/TitleDetail';
import ContentDetail from '../components/detail/ContentDetail';
import UpVote from '../components/common/icon/UpVote';
import DownVote from '../components/common/icon/DownVote';
import ButtonAddComment from '../components/detail/ButtonAddComment';
import CommentList from '../components/detail/CommentList';

export default function Detail() {
  return (
    <div className="bg-base-100">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-10 md:px-16 lg:px-28">
        <div className="card bg-white shadow-xl px-10 py-6">
          <div className="card-body">
            <TitleDetail />
            <ContentDetail />
            <div className="flex gap-5 mt-5">
              <UpVote />
              <DownVote />
            </div>
            <ButtonAddComment />
            <CommentList />
          </div>
        </div>
      </div>
    </div>
  );
}

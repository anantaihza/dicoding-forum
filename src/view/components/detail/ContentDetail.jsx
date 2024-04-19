import React from 'react';
import parser from 'html-react-parser';
import { useSelector } from 'react-redux';

export default function ContentDetail() {
  const { dataDetail } = useSelector((state) => state.threads);
  const parsedBody =
    typeof dataDetail?.body === 'string' ? parser(dataDetail?.body) : null;
  return (
    <div className="text-neutral mt-5" data-testid="content-detail">
      {parsedBody}
    </div>
  );
}

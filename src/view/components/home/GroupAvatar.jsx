import React from 'react';
import PropType from 'prop-types';

export default function GroupAvatar({ listBoard, totalUser }) {
  return listBoard ? (
    <div className="avatar-group -space-x-6 rtl:space-x-reverse justify-center my-2">
      {listBoard?.map((avatar) => (
        <div className="avatar">
          <div className="w-11">
            <img src={avatar?.user?.avatar} alt={avatar?.user?.name} />
          </div>
        </div>
      ))}
      <div className="avatar placeholder">
        <div className="w-11 bg-neutral text-neutral-content">
          <span>+{totalUser - listBoard.length}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center">
      <span className="loading loading-dots loading-lg bg-neutral" />
    </div>
  );
}

GroupAvatar.propTypes = {
  listBoard: PropType.array.isRequired,
  totalUser: PropType.number.isRequired,
};

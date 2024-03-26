import React from 'react';
import PropType from 'prop-types';

export default function GroupAvatar({ listBoard, totalUser }) {
  return (
    <div className="avatar-group -space-x-6 rtl:space-x-reverse justify-center my-2">
      {listBoard?.map((avatar) => (
        <div className="avatar" key={avatar?.user?.id}>
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
  );
}

GroupAvatar.propTypes = {
  listBoard: PropType.array,
  totalUser: PropType.number.isRequired,
};

GroupAvatar.defaultProps = {
  listBoard: [],
};

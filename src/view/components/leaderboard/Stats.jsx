import React from 'react';
import PropType from 'prop-types';

export default function Stats({ title, value }) {
  return (
    <div className="stats shadow w-fit bg-primary">
      <div className="stat">
        <div className="stat-title text-white">{title}</div>
        <div className="stat-value text-white">{value}</div>
      </div>
    </div>
  );
}

Stats.propTypes = {
  title: PropType.string.isRequired,
  value: PropType.string.isRequired,
};

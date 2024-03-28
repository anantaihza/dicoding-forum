import React from 'react';
import PropType from 'prop-types';

export default function Stats({ title, value, isLoading }) {
  return (
    <div className="stats shadow w-44 bg-primary">
      <div className="stat">
        <div className="stat-title text-white">{title}</div>
        {isLoading ? (
          <span className="loading loading-infinity loading-lg bg-white" />
        ) : (
          <div className="stat-value text-white">{value}</div>
        )}
      </div>
    </div>
  );
}

Stats.propTypes = {
  title: PropType.string.isRequired,
  value: PropType.number.isRequired,
  isLoading: PropType.bool.isRequired,
};

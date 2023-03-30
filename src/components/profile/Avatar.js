import React from 'react';
import PropTypes from 'prop-types';

function Avatar({ avatar }) {
  return (
    <img
      src={avatar}
      className="w-32 h-32 rounded-full object-cover"
      alt="Avatar"
    />
  );
}

Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
};
export default Avatar;

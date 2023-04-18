import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ avatar, ...props }) => <img src={avatar} className={`w-32 h-32 xs:w-20 xs:h-20 rounded-full object-cover ${props.className}`} alt="Avatar" />;

Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
};
export default Avatar;

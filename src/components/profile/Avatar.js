import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ avatar, ...props }) => <img src={avatar} className={`w-32 h-32 xs:w-8 xs:h-8 rounded-full object-cover ${props.className}`} alt="Avatar" />;

Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
};
export default Avatar;

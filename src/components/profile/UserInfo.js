import React from 'react';
import PropTypes from 'prop-types';

function UserInfo({
  firstname, lastname, email, phone,
}) {
  return (
    <div className="flex flex-col">
      <h2 className="text-[18px] font-extrabold mb-1">
        {firstname}
        {' '}
        {lastname}
      </h2>
      <p className="text-[16px] text-gray-500">
        {email}
        /
        {phone}
      </p>
    </div>
  );
}

UserInfo.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
};

UserInfo.defaultProps = {
  phone: '',
};

export default UserInfo;

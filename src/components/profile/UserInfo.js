import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({
  firstname, lastname, email, phone,
}) => (
  <div className="flex flex-col">
    <h2 className="text-[18px] font-extrabold mb-1 poppins xs:text-[16px]">
      {firstname}
      {' '}
      {lastname}
    </h2>
    <div className="flex flex-row xs:flex-col xs:text-[16px]">
      <p className="text-[16px] text-gray-500">
        {email}
        <span className="slash xs:hidden inline">&#47;</span>
      </p>
      <p className="text-[16px] text-gray-500">
        {phone}
      </p>
    </div>
  </div>
);

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

import React from 'react';
import PropTypes from 'prop-types';

function UserAddress({
  country, state, city, province, zipCode, street,
}) {
  return (
    <div>
      <h4 className="mb-2 text-[18px] font-extrabold text-gray-700">Address</h4>
      <ul className="list-none">
        <li className="flex mb-1">
          <p className="w-24 text-gray-700">Country:</p>
          <p className="text-gray-500">{country}</p>
        </li>
        <li className="flex mb-1">
          <p className="w-24 text-gray-700">State:</p>
          <p className="text-gray-500">{state}</p>
        </li>
        <li className="flex mb-1">
          <p className="w-24 text-gray-700">Province:</p>
          <p className="text-gray-500">{province}</p>
        </li>
        <li className="flex mb-1">
          <p className="w-24 text-gray-700">City:</p>
          <p className="text-gray-500">{city}</p>
        </li>
        <li className="flex mb-1">
          <p className="w-24 text-gray-700">Zip code:</p>
          <p className="text-gray-500">{zipCode}</p>
        </li>
        <li className="flex mb-1">
          <p className="w-24 text-gray-700">Street:</p>
          <p className="text-gray-500">{street}</p>
        </li>
      </ul>
    </div>
  );
}

UserAddress.propTypes = {
  country: PropTypes.string,
  state: PropTypes.string,
  province: PropTypes.string,
  city: PropTypes.string,
  zipCode: PropTypes.string,
  street: PropTypes.string,
};

UserAddress.defaultProps = {
  country: 'Rwanda',
  state: 'N/A',
  province: '',
  city: '',
  zipCode: '00000',
  street: '',
};
export default UserAddress;

import React from 'react';
import PropTypes from 'prop-types';

function InputField({
  label, name, value, onChange, type,
}) {
  return (
    <>
      <label htmlFor={name} className="sr-only">{label}</label>
      <input type={type} id={name} name={name} value={value} onChange={onChange} className="relative block w-full rounded-t-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#338E03] sm:text-sm sm:leading-6 my-6" />
    </>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  label: '',
  onChange() {},
};
export default InputField;

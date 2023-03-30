import React from 'react';
import PropTypes from 'prop-types';

function InputField({
  label, name, value, onChange, type,
}) {
  return (
    <div className="flex flex-row mb-6">
      <label htmlFor={name} className="w-48">{label}</label>
      <input type={type} id={name} name={name} value={value} onChange={onChange} className="border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300" />
    </div>
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

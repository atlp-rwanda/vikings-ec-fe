import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const InputField = forwardRef(({ ...props }, ref) => (
  <div className="flex flex-row mb-6">
    <label htmlFor={props.name} className="w-48">
      {props.label}
    </label>
    <input
      type={props.type}
      ref={ref}
      className="border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300"
      {...props}
    />
  </div>
));

InputField.displayName = 'InputField';

export default InputField;

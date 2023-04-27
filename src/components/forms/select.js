import React, { forwardRef } from 'react';

const SelectBox = forwardRef(({ ...props }, ref) => (
  <div className="" ref={ref}>
    <label htmlFor={props.label} >{props.label}</label>
    <select name={props.label} {...props} data-testid='select'>
      {props?.options?.map((option) => (
        <option
          key={option.id}
          value={option.id}
          data-testid='select-btn'
          selected={option.id === props.category ? true : false}
        >
          {option.name}
        </option>
      ))}
    </select>
  </div>
));

export default SelectBox;
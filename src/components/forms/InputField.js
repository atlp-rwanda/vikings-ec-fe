import React, { forwardRef } from 'react';

const InputField = forwardRef(({ ...props }, ref) => {
    return (
      <div className='h-[80px]'>
        <label htmlFor={props.name} className={`${props.styles}sr-only"`}>
          {props.label}
        </label>
        <input
          ref={ref}
          type={props.type}
          placeholder={props.placeholder}
          className={`${props.className}`}
          {...props}
        />
        {props.error && (
          <p className="text-red-500 text-xs " id={`${props.name}-error`}>
            {props.error?.message}
          </p>
        )}
      </div>
    )
})

export default InputField;


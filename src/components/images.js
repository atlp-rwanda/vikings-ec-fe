import React, { forwardRef } from 'react';

const Image = forwardRef(({ ...props }, ref) => (
  <img
    ref={ref}
    src={props.src}
    alt={props.alt}
    className={`${props.className}`}
    {...props}
  />
));

export default Image;
import React from 'react';

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick} disabled={props.disabled} className={` w-full my-2 h-[45px] rounded-md bg-[#338E03] py-2 px-3 text-sm font-semibold text-white hover:bg-[#64B937] ${props.className}`}>{props.label} {props.children }</button>
    </div>
  );
}
export default Button;

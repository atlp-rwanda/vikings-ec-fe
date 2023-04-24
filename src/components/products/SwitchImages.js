import React from 'react';
import left from '../../../public/images/left.svg';
import right from '../../../public/images/right.svg';

const SwitchImages = ({ ...props }) => (
  <div className={props.className}>
    <button data-testid="left-button" onClick={() => props.switchCurrentImage(true)} type="button" className="bg-white hover:bg-[#0cc70c] w-[40px] h-[40] flex justify-center items-center rounded-full" data-testid="right-button">
      <img src={left} alt="left" />
    </button>
    <button data-testid="right-button" onClick={() => props.switchCurrentImage(false)} type="button" className="bg-white  hover:bg-[#0cc70c] w-[40px] h-[40px] flex justify-center items-center rounded-full" data-testid="left-button">
      <img src={right} alt="right" />
    </button>
  </div>
);

export default SwitchImages;

import React from 'react';

const InformSearched = ({ ...props }) => (
  <div className="bg-gray-100 flex justify-between w-full xs:w-56 ">
    <p className="max-w-xs">{props.message}</p>
    <button type="button" data-testid="close-btn" onClick={props.click} className="rounded-full border solid-1 justfy-content items-center hover:bg-[#099f09] w-8 h-8 text-24 font-bold text-[red]">X</button>
  </div>
);
export default InformSearched;

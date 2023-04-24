import React from 'react';
import profile from '../../../public/images/Profile.png';


const Reviewers = ({ ...props }) => (
  <div className="">
    <div className="flex gap-3">
      {props.reviewer.avatar ? <img src={props.reviewer.avatar} alt="profile" className="h-9 w-9 rounded-full" />
        : <img src={profile} alt="profile" className="h-9 w-9 rounded-full" />}
      <span className="text-[#353535] text-[18px]">
        {props.reviewer.firstname}
        {' '}
        {props.reviewer.lastname}
      </span>
    </div>
    <p className="px-12">{props.reviewer.feedback}</p>
  </div>
);

export default Reviewers;

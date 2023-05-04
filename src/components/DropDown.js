import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { changeStatus } from '../features/auth/changeUserStatusSlice';
import { updateRole } from '../features/auth/rolesSlice';
import Transition from './Transition';

const DropDown = ({ toggle, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: rolesData } = useSelector((state) => state.roles);
  const { data: statusChangeData } = useSelector((state) => state.changeStatus);
  const { data: saleStatusChangeData } = useSelector((state) => state.changeSaleStatus);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || !trigger.current) {
        return;
      }
      if (
        !dropdownOpen
        || dropdown.current.contains(target)
        || trigger.current.contains(target)
      ) {
        return;
      }

      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    if (rolesData) {
      setDropdownOpen(false);
    }
  }, [rolesData]);

  useEffect(() => {
    if (statusChangeData) {
      setDropdownOpen(false);
    }
  }, [statusChangeData]);

  useEffect(() => {
    if (saleStatusChangeData) {
      setDropdownOpen(false);
    }
  }, [saleStatusChangeData]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="absolute xs:relative inline-flex">
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        ref={trigger}
        role="button"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        onKeyDown={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {toggle}
      </div>

      <Transition
        className="origin-top-right z-50 w-full absolute top-full right-0 min-w-[200px] translate-x-1/2 bg-brand-blue-light rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          className="w-full h-full"
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          {/* {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onClick: () => setDropdownOpen(false),
            })
          )} */}
          {children}
        </div>
      </Transition>
    </div>
  );
};

export default DropDown;

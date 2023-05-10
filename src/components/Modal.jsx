import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  children,
  toggle,
  header,
  forceCloseOnChange,
  notifyOnClose,
  notifyOnOpen,
  disabled,
}) => {
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    if (notifyOnClose && !showModal) {
      notifyOnClose();
    }
    if (notifyOnOpen && showModal) {
      notifyOnOpen();
    }
  }, [showModal]);
  useEffect(() => {
    setShowModal(false);
  }, [forceCloseOnChange]);
  return (
    <>
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <button
        type="button"
        disabled={disabled}
        className="ease-linear transition-all duration-150 disabled:cursor-not-allowed"
        onClick={() => setShowModal(true)}
      >
        {toggle}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="rounded-lg shadow-lg mx-auto max-w-3xl flex flex-col w-full bg-white max-h-full overflow-y-auto">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                {header}
                <button
                  type="button"
                  className="text-black text-2xl block material-symbols-outlined p-2 bg-brand-bold/10 rounded-xl"
                  onClick={() => setShowModal(false)}
                >
                  close
                </button>
              </div>
              {children}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};

Modal.defaultProps = {
  forceCloseOnChange: false,
  notifyOnClose: undefined,
  notifyOnOpen: undefined,
  disabled: false,
};
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  toggle: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  forceCloseOnChange: PropTypes.bool,
  notifyOnClose: PropTypes.func,
  notifyOnOpen: PropTypes.func,
  disabled: PropTypes.bool,

};

export default Modal;

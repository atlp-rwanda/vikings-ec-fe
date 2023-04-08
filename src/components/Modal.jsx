import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  children,
  toggle,
  header,
  forceCloseOnChange,
  notifyOnClose,
  notifyOnOpen,
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
      <div
        className="ease-linear transition-all duration-150"
        onClick={() => setShowModal(true)}
      >
        {toggle}
      </div>
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
};
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  toggle: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  forceCloseOnChange: PropTypes.bool,
  notifyOnClose: PropTypes.func,
  notifyOnOpen: PropTypes.func,

};

export default Modal;

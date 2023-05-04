import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  currentPage,
  pageCount,
  setPageNumber,
  showNumbers,
  hideWords,
}) => {
  const handleNextPage = () => {
    setPageNumber(currentPage + 1);
  };
  const navTo = (pageNumber) => {
    setPageNumber(pageNumber);
  };
  const handlePrevPage = () => {
    setPageNumber(currentPage - 1);
  };

  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="overflow-x-auto py-3">
      <div className="flex gap-4">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={handlePrevPage}
          className="disabled:cursor-not-allowed disabled:opacity-50 flex items-center space-x-1 py-2 px-3 text-gray-500 bg-white rounded-l border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
          {hideWords ? null : <span>Previous</span>}
        </button>
        {showNumbers
          && new Array(pageCount || 1).fill(0).map((element, index) => {
            const id = `${index}paginationKey`;
            return (
              <button
                type="button"
                key={`${id}`}
                onClick={() => {
                  navTo(index + 1);
                }}
                className={`flex flex-col justify-center items-center ${
                  index + 1 === currentPage
                    ? 'py-2 px-3 text-white bg-brand border border-gray-300 hover:bg-brand/50 hover:text-blue-700'
                    : 'py-2 px-3 text-white bg-brand/50 border border-gray-300 hover:bg-brand hover:text-white'
                }`}
              >
                <span>{index + 1}</span>
              </button>
            );
          })}
        <button
          type="button"
          disabled={currentPage >= pageCount}
          onClick={handleNextPage}
          className="disabled:cursor-not-allowed disabled:opacity-50 flex items-center py-2 px-3 text-gray-500 bg-white rounded-r border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          {hideWords ? null : <span>Next</span>}

          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pageCount: PropTypes.number,
  setPageNumber: () => {},
  showNumbers: PropTypes.bool,
  hideWords: PropTypes.bool,
};

Pagination.defaultProps = {
  currentPage: 1,
  pageCount: 1,
  setPageNumber: () => {},
  showNumbers: true,
  hideWords: true,
};

export default Pagination;

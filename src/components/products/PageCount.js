import React from 'react';
import next from '../../../public/images/next.png';
import prevPage from '../../../public/images/nextPage.svg';
import nextPage from '../../../public/images/prevPage.svg';

const PageCount = ({ ...props }) => (
  <div className={props.className} data-testid="page-number">
    <div className="flex xs:gap-[5px] md:gap-[140px]  justify-center items-center">
      <div>
        <button
          data-testid="next-page"
          type="button"
          className="flex justify-center items-center gap-2 md:px-4 md:py-2 lg:px-4 lf:py-2 xl:px-4 xl:py-2 xs:px-1 xs:py-1 hover:bg-[#045504] bg-[#10c510] text-[white] xs:w-[150px]"
          onClick={() => props.click(true)}
        >
          Next page
          <img src={next} alt="next page" className="mt-2" />
        </button>
      </div>
      <div className="flex gap-[30px]">
        <p>Page</p>
        <span className="ml-[-20px]">{props.currentPage}</span>
        <p className="ml-[-20px]">
          of
          <span className="ml-[13px]">{props.totalPages}</span>
        </p>
        <button type="button" className="flex justify-center items-center gap-[20px] hover:bg-[#045504] bg-[#10c510] h-[23px] px-2 py-2">
          <img src={prevPage} onClick={() => props.click(false)} alt="previous page" />
          <img src={nextPage} onClick={() => props.click(true)} alt="next-page" />
        </button>
      </div>
    </div>
  </div>
);

export default PageCount;

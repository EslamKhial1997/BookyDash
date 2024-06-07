import React from 'react';
import ReactJsPagination from 'react-js-pagination';

import { PaginationWrapper } from './PaginationStyle';

interface IPagination {
  page: number,
  size: number,
  itemsCount: number,
  onChange: (page: number) => void
}

const Pagination = ({ page, size = 10, itemsCount, onChange }: IPagination) => {
  return (
    <PaginationWrapper>
      <ReactJsPagination
        activePage={page}
        itemsCountPerPage={size}
        totalItemsCount={itemsCount}
        pageRangeDisplayed={10}
        hideDisabled={true}
        onChange={onChange}
      />
    </PaginationWrapper>
  )
}

export default Pagination
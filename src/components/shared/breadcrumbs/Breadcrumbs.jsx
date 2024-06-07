import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem, Box } from '@chakra-ui/react';

import { BreadcrumbsWrapper } from './BreadcrumbsStyle';


const Breadcrumbs = ({ currentPage, pages = [] }) => {
  return (
    <BreadcrumbsWrapper>
      <Box fontSize="1.2rem" fontWeight="600" mb={2} textTransform="capitalize">
        {currentPage}
      </Box>
      <Breadcrumb mb={8}>
        {pages.map((el, index) => (
          <BreadcrumbItem key={index}>
            <NavLink to={el.path} className="chakra-breadcrumb__link">{el.name}</NavLink>
          </BreadcrumbItem>
        ))}
        <BreadcrumbItem isCurrentPage>
          <span>{currentPage}</span>
        </BreadcrumbItem>
      </Breadcrumb>
    </BreadcrumbsWrapper>
  )
}

export default memo(Breadcrumbs)
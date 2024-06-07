import styled from 'styled-components';

export const BreadcrumbsWrapper = styled.nav`
  .chakra-breadcrumb__list-item{
    a, span {
      font-weight: 500;
      text-transform: capitalize;
      color: ${({ theme }) => theme.dark};
      font-size: .9rem;
    }
    span {
      color: ${({ theme }) => theme.primary};
    }
  }
`;
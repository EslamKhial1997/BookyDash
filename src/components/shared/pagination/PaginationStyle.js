import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  padding-top: 1.5rem;
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      margin-inline-end: .5rem;
      margin-bottom: .5rem;
      &.active, &.disabled {
        a {
          color: ${({ theme }) => theme.secColor};
          user-select: none;
          user-select: none;
          cursor: no-drop;
        }
      }

      a {
        border-radius: .3rem;
        padding: .4rem .8rem;
        background: ${({ theme }) => theme.light};
        color: ${({ theme }) => theme.dark};
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }
  }
`;
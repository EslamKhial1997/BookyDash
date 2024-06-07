import styled from 'styled-components';

export const TableWrapper = styled.section`
  background: ${({ theme }) => theme.light};
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: .2rem;
  overflow: hidden;
  table {
    thead {
      tr {
        th {
          padding: .8rem 1rem;
          color: ${({ theme }) => theme.dark};
          border-bottom: 1px solid #eee;
          text-transform: capitalize;
        }
      }
    }
    tbody {
      tr {
        &:last-child {
          td {
            border-bottom: none;
          }
        }
        td {
          border-bottom: 1px solid #eee;
          text-align: center;
          padding: 1rem .3rem;
          font-weight: bold;
          font-size: 14px;
          max-width: 200px;
          white-space: normal;
          color: ${({ theme }) => theme.dark};
        }
      }
    }
  }
`;
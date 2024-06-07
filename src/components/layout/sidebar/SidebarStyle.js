import styled, { css } from 'styled-components';

export const SidebarOverlay = styled.div`
  @media only screen and (min-width: 992px) {
    display: none !important;
  }
`;

export const SidebarWrapper = styled.aside`
  z-index: 1000;
  width: 250px;
  position: fixed;
  ${({ theme }) => theme.start}: -250px;
  background: ${({ theme }) => theme.bg};
  height: 100vh;
  overflow-y: auto;
  padding: 1.5rem 1rem;
  transition: .5s;
  /* ${({ theme }) => `border-${theme.end}`}: 1px solid rgba(255, 255, 255, 0.04); */
  @media only screen and (min-width: 992px) {
    ${({ theme }) => theme.start}: 0;
    width: 250px;
  }
  &.active {
    ${({ theme }) => theme.start}: 0;
  }
  .sidebar-links {
    .chakra-accordion {
      .chakra-accordion__item {
        .chakra-accordion__button {
          display: block;
          padding: .8rem 1rem;
          position: relative;
          border-radius: .1rem;
          color: ${({ theme }) => theme.light};
          margin-bottom: .3rem;
          &:hover {
            background: none;
          }
          .icon {
            color: ${({ theme }) => theme.light};
            font-size: 19px;
            margin-top: -4px;
          }
          .text {
            margin: 0 1rem;
            text-transform: capitalize;
            font-weight: 400;
            font-size: 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .collapse-icon {
            transition: .3s;
            ${({ theme }) => theme.start === 'right' && css`
              transform: rotate(180deg);
            `}
          }
          &[aria-expanded="true"], &.active {
            background: ${({ theme }) => theme.primary};
            .icon, .collapse-icon, .text {
              color: ${({ theme }) => theme.light};
            }
            .collapse-icon {
              transform: rotate(90deg);
            }
          }
        }
        .chakra-collapse {
          ul {
            list-style: none;
            margin-bottom: 1rem;
            margin-inline-start: 1rem;
            li {
              margin-bottom: .5rem;
              &:last-child {
                margin-bottom: 0;
              }
              a {
                display: flex;
                align-items: center;
                &.active {
                  span {
                    color: ${({ theme }) => theme.secColor};
                  }
                }
                svg {
                  margin-top: -4px;
                  color: ${({ theme }) => theme.secColor};
                  font-size: 13px;
                  ${({ theme }) => theme.start === 'right' && css`
                    transform: rotate(180deg);
                  `}
                }
                span {
                  color: ${({ theme }) => theme.light};
                  padding: 0 .3rem;
                  text-transform: capitalize;
                  font-size: 12px;
                  font-weight: 400;
                }
              }
            }
          }
        }
      }
    }
  }
`;
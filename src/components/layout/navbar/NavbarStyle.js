import styled from 'styled-components';

export const NavbarWrapper = styled.nav`
  background: ${({ theme }) => theme.light};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 1rem;
  .chakra-menu__menu-list {
    padding: 0;
    background: ${({ theme }) => theme.light};
  }
  .input-search, .profile-text {
    @media only screen and (max-width: 991px) {
      display: none;
    }
  }
`;
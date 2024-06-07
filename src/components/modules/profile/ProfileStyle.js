import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  a:focus {
    outline: none;
    box-shadow: none;
  }
  a.active {
    color: ${({ theme }) => theme.primary};
  }
`;
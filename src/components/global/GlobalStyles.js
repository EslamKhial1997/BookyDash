import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    background: ${({ theme }) => theme.body} !important;
    min-height: 100vh;
    /* font-family: 'Roboto', sans-serif !important; */
    /* font-family: 'Plus Jakarta Sans', sans-serif !important; */
    font-family: 'Inter', sans-serif !important;
  }

  .chakra-input__right-element, .chakra-select__icon-wrapper {
    ${({ theme }) => theme.end}: .5rem !important;
    ${({ theme }) => theme.start}: auto !important;
  }

  .chakra-input__left-element {
    ${({ theme }) => theme.start}: .5rem !important;
    ${({ theme }) => theme.end}: auto !important;
  }

  ul, ol {
    list-style: none;
  }

  button {
    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }
  }

  textarea {
    resize: none !important;
  }
`;
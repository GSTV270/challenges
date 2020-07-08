import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: var(--blue0);
    color: var(--secondary);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  :root {
    --background: #232129;
    --placeholder: #636360;
    --blue0: #252a3c;
    --blue1: #2a4474;
    --blue2: #3066be;
    --blue3: #4374c4;
    --blue4: #b4c5e4;
    --secondary: #f5f5f5;

    --white: #fff;
    --gray: #8a8c90;
    --red: #c53030;
  }
`;

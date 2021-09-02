import {createGlobalStyle} from "styled-components";
import baseStyles from "./baseStyles";

export const GlobalStyle = createGlobalStyle`
${baseStyles}

*, *::before, *::after {
  box-sizing: border-box;
}

html, body, #root {
    height: 100%;
    font-family: helvetica;
}
`;

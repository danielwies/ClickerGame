import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    @font-face {
        font-family: "ALPHD";
        src: url("fonts/ALPHD.ttf?") format("truetype");
    }
        font-family: ALPHD;
        font-weight: 8;
        letter-spacing: 1.5px;
    }
`;

export default GlobalStyle;

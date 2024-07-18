import { css } from 'styled-components';



export const sizes = {
    mobile: 600,
    portrait: 900,
    landscape: 1300,
    desktop: 1800,
  };
 const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (arg0, arg1) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(arg0, arg1)}
      }
    `;

  return acc;
}, {});
export default media

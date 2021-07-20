export const breakpoints = {
  xsss: 320,
  xss: 375, //xss
  xs: 480,
  sm: 576, //xs
  md: 768, //sm
  lg: 992, //md
  xl: 1200, //lg
  xxl: 1600, //xxl
  xxxl: 2560,
};

export const mediaQueries = (key) => (style) =>
  `@media (max-width: ${breakpoints[key]}px) { ${style} }`;

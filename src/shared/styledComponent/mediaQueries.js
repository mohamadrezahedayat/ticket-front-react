// MEDIA QUERY MANAGER
/*
0 - 600px:          Phone
600 - 900PX:        Tablet portrait
900 - 1200px:       tablet landscape
[1200 - 1800]       is where our normal styles apply
1800px + :          Big desktop

* another resource for breakpoints
  320px — 480px: Mobile devices 
  481px — 768px: iPads, Tablets
  769px — 1024px: Small screens, laptops
  1025px — 1200px: Desktops, large screens
  1201px and more —  Extra large screens, TV

$breakpoint argument choices:
* default style
- tabletLandscape  //from big to small
- tabletPortrait
- phone

- bigDesktop  //last one is the bigest

*ORDER: Base + typography > general layout + grid > page layout > components

1em = 16px
*/
export const Screen = {
  // normal goes first: 1025px — 1200px: Desktops, large screens
  // order to use media queries---->

  // smaller than 900px
  tabletLandscape: (...args) =>
    `@media only screen and (max-width: 56.25em){${args}}`,

  // smaller than 768px
  tabletPortrait: (...args) =>
    `@media only screen and (max-width: 48em){${args}}`,

  // smaller than 480px
  phone: (...args) => `@media only screen and (max-width: 30em){${args}}`,

  // greeater than 1200px
  bigDesktop: (...args) => `@media only screen and (min-width: 75em){${args}}`,

  // greeater than 1800px
  ultraBigDesktop: (...args) =>
    `@media only screen and (min-width: 112.5em){${args}}`,
};

export const setMediaQuery = ({ isMinWidth = 'true', breakPoint }, ...args) => {
  const condition = isMinWidth ? 'min-width' : 'max-width';
  return `@media only screen and (${condition}: ${breakPoint}){${args}}`;
};

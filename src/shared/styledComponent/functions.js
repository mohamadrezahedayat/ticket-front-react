export const Colors = {
  primary: '#340068',
  primaryLight: '#5704aa',
  primaryDark: '#220142',

  secondary: '#6d435a',
  secondaryLight: '#a56789',
  secondaryDark: '#492e3d',

  tertiary: '#ff6978',
  tertiaryLight: '#fc8692',
  tertiaryDark: '#e05d6a',

  forth: '#b1ede8',
  forthLight: '#cef7f3',
  forthDark: '#95cec9',

  greyLight1: '#f7f7f7',
  greyLight2: '#eee',

  grey: ' #6a666e',
  greyLight: '#b7b6b9',
  greyDark: 'rgb(28, 28, 29)',

  white: '#fff',
  black: '#000',
};

export const fonts = {
  main: "font-family:'Lato',sans-serif;",
};

export const setFlex = ({
  alignItems = 'center',
  justifyContent = 'center',
  flexWrap = 'nowrap',
  flexDirection = 'row',
} = {}) => {
  return `display:flex; 
          align-items:${alignItems};
          justify-content:${justifyContent};
          flex-wrap:${flexWrap};
          flex-direction:${flexDirection};`;
};

export const setflexSelf = ({
  flex = '',
  alignSelf = '',
  justifySelf = '',
}) => {
  let string = '';
  if (flex !== '') string = string + `flex:${flex};`;
  if (alignSelf !== '') string = string + `align-self:${alignSelf};`;
  if (justifySelf !== '') string = string + `justify-self:${justifySelf};`;
  return string;
};

export const setBackground = ({ img, color = 'rgba(0,0,0,0)' }) => {
  return `background: linear-gradient(${color},${color}), url("${img}") center/cover fixed no-repeat;`;
};

export const setBackgroundColor = (color) => `background-color:${color};`;

export const setRem = (number = '16') => {
  return `${number / 16}rem`;
};

export const setBorder = ({
  width = '2px',
  style = 'solid',
  color = 'black',
  position = '',
} = {}) => {
  return `border${
    position !== '' ? '-' + position : ''
  }:${width} ${style} ${color};`;
};

export const setMargin = (input) => {
  const [x, y, z, w] = input.split(',');
  return `margin:${x} ${y ? y : ''} ${z ? z : ''} ${w ? w : ''};`;
};

export const setSingleMargin = (string) => {
  const [side, len] = string.split(',');
  return `margin-${side}:${len};`;
};

export const setPadding = (input) => {
  const [x, y, z, w] = input.split(',');
  return `padding:${x} ${y ? y : ''} ${z ? z : ''} ${w ? w : ''};`;
};

export const setSinglePadding = (string) => {
  const [side, len] = string.split(',');
  return `padding-${side}:${len};`;
};

export const setHeight = (height) => `height: ${height};`;

export const setWidth = (width) => `width: ${width};`;

export const setBoxShadow = ({
  x = '.1rem',
  y = '.5rem',
  z = '.5rem',
  color = 'rgba(0,0,0,.5)',
} = {}) => `box-shadow: ${x} ${y} ${z} ${color};`;

export const setAbsPos = ({ x = 'top,0', y = 'left,0' } = {}) =>
  `position:absolute; 
  ${x.split(',')[0]}: ${x.split(',')[1]};
  ${y.split(',')[0]}: ${y.split(',')[1]};`;

export const setBorderRadius = (radius) => `border-radius:${radius};`;

export const setZindex = (z) => `z-index:${z};`;

export const transform = (params) => {
  let string = 'transform:';
  for (let i = 0; i < params.length; i++) {
    string += params[i] + ';';
  }
  return string;
};

export const setOverflow = (string) => {
  const params = string.split(',');
  if (params.length === 1) return `overflow:${params[0]};`;
  if (params.length === 2) return `overflow-${params[0]}:${params[1]};`;
  if (params.length === 4)
    return `overflow-${params[0]}:${params[1]};overflow-${params[2]}:${params[3]};`;
};

export const setCursor = (val) => `cursor:${val};`;

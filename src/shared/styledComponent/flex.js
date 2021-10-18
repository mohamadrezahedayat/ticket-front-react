//* Properties for the Parent (flex container)

export const display = 'flex';
// justify-content: This defines the alignment along the main axis
export const JustifyContent = [
  'flex-start', //* default
  'flex-end',
  'center',
  'space-between', //!: partial support: no space in start and end just between
  'space-around', //start and end 1/2 space , beween 1 space
  'space-evenly', //event space in start, end and between
];

// align-items: This defines the behavior for flex items along the cross axis
export const AlignItems = [
  'flext-start',
  'flex-end',
  'center',
  'stretch', //* default
  'base-line',
];

// align-content: if cross item has multiple items
export const AlignContent = [
  'normal', //* default: normal position
  'flex-start', //or start: items packed to the start of the container
  'flex-end', //or end:  items packed to the end of the container
  'center',
  'stretch',
  'space-between', // between = 1 ,  start=0,    end = 0
  'space-around', // between = 1 ,  start=0.5,  end = 0.5
  'space-evenly', // between = 1 ,  start=1,    end = 1
];

// gap: explicitly controls the space between flex items.(not on the outer edges).
export const Gaps = {
  gap: '10px',
  // eslint-disable-next-line no-dupe-keys
  gap: '10px 20px',
  'row-gap': '10px',
  'column-gap': '20px',
};

//* Properties for the Children (flex items)

//default order of each item is 0
// navigate number is valid
export const order = [1, 2, 4, 5, 6, 8, -1];

// flex-grow: It dictates what amount of the available space inside the flex container the item should take up.
// navigate number is invalid
export const flexGrow = [1, 0.2, 0.5, 4, 7];

// flex-shrink: defines the ability for a flex item to shrink if necessary.
// navigate number is invalid
export const flexShrink = [1, 0.2, 0.5, 4, 7];

// flex-basis: defines the default size of an element before the remaining space is distributed.
export const flexBasis = [
  '20%',
  '2rem',
  'auto', // auto means look at width or height property,
  'content', // !not well supported
];

// short hand for 3 properties
export const flex = ['flex-grow', 'flex-shrink', 'flex-basis'];

// algin-self
export const alignSelf = [
  'flext-start',
  'flex-end',
  'center',
  'stretch',
  'base-line',
];

//
// * end of documentation
//
export const setFlex = ({
  flexWrap = 'nowrap',
  flexDirection = 'row',
  alignItems = 'center',
  justifyContent = 'center',
} = {}) =>
  `display:flex; 
  align-items:${alignItems};
  justify-content:${justifyContent};
  flex-wrap:${flexWrap};
  flex-direction:${flexDirection};`;

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

// Properties for the Parent (Grid Container)
export const Display = ['grid', 'inline-grid'];

// end of documentation
export const setGrid = () => 'display: grid;';
export const setGridRowStart = (rowStart = 1) => `grid-row-start: ${rowStart};`;
export const setGridColumn = (column = 1 / 2) => `grid-column: ${column};`;
export const setGridTemplateRows = (gridTemplateRows = '1fr') =>
  `grid-template-rows: ${gridTemplateRows};`;
export const setGridTemplateColumns = (gridTemplateColumns = '1fr') =>
  `grid-template-columns: ${gridTemplateColumns};`;

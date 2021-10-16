import { createGlobalStyle } from 'styled-components';

import {
  setColor,
  setBackgroundColor,
} from './shared/styledComponent/functions';
import { Colors } from './shared/styledComponent/variables';
import { Screen } from './shared/styledComponent/mediaQueries';

export const GlobalStyle = createGlobalStyle`
 *,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%; 

  ${Screen.tabletLandscape`font-size: 56.25%;`}
  ${Screen.tabletPortrait`font-size: 50%;`}
  ${Screen.bigDesktop`font-size: 75%;`}
}

body {
  box-sizing: border-box;
  ${setColor(Colors.white)}
}

::selection {
  ${setColor(Colors.white)}
  ${setBackgroundColor(Colors.primary)}
}
`;

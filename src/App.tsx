import React from 'react';
import { createGlobalStyle } from 'styled-components'
import { Generator } from 'Generator';
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming';


// -------------------------------------------------------- //
//                          Main App                        //
// -------------------------------------------------------- //

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Generator />
    </ThemeProvider>
  );
}

// -------------------------------------------------------- //
//                           Styles                         //
// -------------------------------------------------------- //

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    min-height: 100%;
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
    font-family: 'Open Sans', sans-serif;
  }
`

// Theme override for Zendesk garden's dropdown component
const theme = {
  ...DEFAULT_THEME,
  "colors": {
    ...DEFAULT_THEME.colors,
    "background": "#EEE",
    "foreground": "#000",
  }
};

export default App;

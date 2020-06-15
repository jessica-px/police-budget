import React from 'react';
import { createGlobalStyle } from 'styled-components'
import { Generator } from 'Generator';
import { DataPage } from 'DataPage';
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


// -------------------------------------------------------- //
//                          Main App                        //
// -------------------------------------------------------- //

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route path="/data">
            <DataPage />
          </Route>
          <Route path="/">
            <Generator />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
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

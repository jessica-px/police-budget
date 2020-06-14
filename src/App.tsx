import React from 'react';
import { createGlobalStyle } from 'styled-components'
import { Generator } from 'Generator';


// -------------------------------------------------------- //
//                          Main App                        //
// -------------------------------------------------------- //

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Generator />
    </React.Fragment>
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
  }
`

export default App;

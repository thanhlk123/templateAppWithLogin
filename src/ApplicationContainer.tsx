import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from '@theme/index';
// import AppNavigator from '@navigator/AppNavigator';
import AppNavigator from "@navigator/index";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppNavigator />
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        '&::-webkit-scrollbar': {
          width: '4px',
          background: "black"
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: "white",
          borderRadius: '24px',
        },
        overflowX: "hidden"
      }
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('app-admin-container'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();

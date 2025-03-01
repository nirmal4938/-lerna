import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
// import { ToastProvider } from 'react-toast-notifications';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { I18nextProvider } from 'react-i18next';
// import { FiberProvider } from 'its-fine'
import { defaultTheme } from 'ui-components';
import i18next from './translations/i18next';
import { HotkeyProvider } from './components/HotkeyProvider/HotkeyProvider';
import { App } from './App';
import store from './store';
import { client } from './apollo';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

const theme = {
  ...defaultTheme,
  BTN_HOVER: '#164864',
};
// if (process.env.NODE_ENV === 'development') {
  loadDevMessages();
  loadErrorMessages();
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <FiberProvider> */}
    <I18nextProvider i18n={i18next}>
      <Router>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ApolloProvider client={client}>
              {/* <ToastProvider placement="top-center"> */}
              <HotkeyProvider>
                <App />
              </HotkeyProvider>
              {/* </ToastProvider> */}
            </ApolloProvider>
          </Provider>
        </ThemeProvider>
      </Router>
    </I18nextProvider>
    {/* </FiberProvider> */}
  </React.StrictMode>
);

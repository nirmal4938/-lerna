import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
// import { ToastProvider } from 'react-toast-notifications';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { I18nextProvider } from 'react-i18next';
import { FiberProvider } from 'its-fine'
// import { MsalProvider } from '@azure/msal-react';
import { defaultTheme } from 'ui-components';
// import { client } from './apollo';
// import App from './App';
// import { pca } from './config/msal';
// import { SUBDOMAIN } from './constants';
// import * as serviceWorker from './serviceWorker';
import store from './store';
import i18next from './translations/i18next';
import { HotkeyProvider } from './components/HotkeyProvider/HotkeyProvider';
import { MainView } from "./views/MainView";
import { DashboardView } from './views/DashboardView/DashboardView';
import client from './apolloClient';

const theme = {
  ...defaultTheme,
  BTN_HOVER: '#164864',
};
console.log("client", client)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <MainView/> */}
    <FiberProvider>
      <I18nextProvider i18n={i18next}>
        <Router>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <ApolloProvider client={client}>
                {/* <ToastProvider placement="top-center"> */}
                <HotkeyProvider>
                  {/* <DashboardView /> */}
                  <MainView />
                </HotkeyProvider>
                {/* </ToastProvider> */}
              </ApolloProvider>
            </Provider>
          </ThemeProvider>
        </Router>
      </I18nextProvider>
    </FiberProvider>
  </React.StrictMode>
);
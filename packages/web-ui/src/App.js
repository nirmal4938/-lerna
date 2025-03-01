import React from "react";
import {
    Routes, Route,
  } from 'react-router-dom';
  import { OverlayProvider } from "./components/OverlayProvider/OverlayProvider";
import { MainView } from "./views/MainView";
import { useLocalAuthInitialize } from "./hooks/useLocalAuthInitialize";
import LoginView from "./views/LoginView/LoginView";
export const App = () => {
useLocalAuthInitialize();

return (<React.Fragment>
  <OverlayProvider>
<Routes>
  <Route path = "/login" element = {<LoginView/>} />
  <Route path="/*" element={<MainView/>} />
  {/* { !SUBDOMAIN && (<Route path="/" render={() => (<Redirect to="/" />)} />) } */}
</Routes>
</OverlayProvider>
    </React.Fragment>)
}
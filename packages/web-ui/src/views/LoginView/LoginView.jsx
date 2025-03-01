import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import LoginPasswordResetView from './LoginPasswordResetView';
// import LoginRequestPasswordResetView from './LoginRequestPasswordResetView';
import LoginSelectView from './LoginSelectView';

export default () => (
  <Routes>
    {/* <Route path="/login/request-password-reset" component={LoginRequestPasswordResetView} />
    <Route path="/login/password-reset" component={LoginPasswordResetView} /> */}
    <Route path="/" element={<LoginSelectView />} />
  </Routes>
);

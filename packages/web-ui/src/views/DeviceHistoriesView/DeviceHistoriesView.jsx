import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DeviceHistoriesList } from './DeviceHistoriesList';

export default () => (
  <Routes>
    <Route path="/" element={<DeviceHistoriesList />} />
  </Routes>
);

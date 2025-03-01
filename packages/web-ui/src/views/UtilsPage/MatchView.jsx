import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {  MatchScorePage } from './MatchScorePage';
import { MatchPage } from './MatchPage';

export default () => (
  <Routes>
    <Route path="/" element={<MatchPage />} />
    <Route path="/scorer" element={<MatchScorePage />} />
  </Routes>
);

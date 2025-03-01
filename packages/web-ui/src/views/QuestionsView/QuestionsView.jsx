import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QuestionEdit } from './QuestionEdit';

export default () => (
  <Routes>
    <Route path="/" element={<QuestionEdit />} />
  </Routes>
);

import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from 'react-spinkit';
import defaultProps from 'recompose/defaultProps';
import getContext from 'recompose/getContext';
import lifecycle from 'recompose/lifecycle';
import { compose } from 'redux';
import { func } from 'prop-types';

export const LoadingIndicator = compose(
  defaultProps({
    color: '#1F6187',
    name: 'cube-grid', // http://kyleamathews.github.io/react-spinkit/
  }),
  getContext({
    getLoadingProvider: func.isRequired,
    activate: func.isRequired,
    deactivate: func.isRequired,
  }),
  lifecycle({
    componentDidMount() {
      this.props.activate();
    },
    componentWillUnmount() {
      this.props.deactivate();
    },
  })
)(({ name, color, getLoadingProvider, none }) => {
  const element = getLoadingProvider();

  if (!element || none) {
    return null;
  }

  return ReactDOM.createPortal(
    <Spinner color={color} name={name} fadeIn="quarter" />,
    element
  );
});

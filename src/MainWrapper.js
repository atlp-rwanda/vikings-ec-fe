import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from './store';

const MainWrapper = ({ children }) => (
  <React.StrictMode>
    <Provider store={store}>{children}</Provider>
  </React.StrictMode>
);
MainWrapper.propTypes = {
  children: PropTypes.node,
};
MainWrapper.defaultProps = {
  children: null,
};
export default MainWrapper;

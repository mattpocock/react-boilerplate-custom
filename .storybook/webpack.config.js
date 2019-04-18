const path = require('path');
const webpack = require('webpack');

module.exports = ({ config }) => {
  config.resolve.modules.push('app');
  return config;
};

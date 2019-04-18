/**
 *
 * App
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import messages from './messages';
import * as apiCalls from './apiCalls';
import connectApiCalls from 'utils/helperFunctions/connectApiCalls';

const container = 'app';

export const App = props => {
  console.log(props);
  return (
    <div>
      <FormattedHTMLMessage {...messages.header} />
    </div>
  );
};

App.propTypes = {
  getConfig: PropTypes.object.isRequired,
};

export default connectApiCalls({
  container,
  apiCalls,
})(App);

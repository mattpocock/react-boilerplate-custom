import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import LanguageProvider from '../app/containers/LanguageProvider';
import createHistory from 'history/createBrowserHistory';
import configureStore from '../app/configureStore';

const history = createHistory();
const store = configureStore({}, history);

addDecorator(storyFn => (
  <Provider store={store}>
    <LanguageProvider messages={{}}>
      <div
        style={{
          padding: '1.5rem',
        }}
      >
        {storyFn()}
      </div>
    </LanguageProvider>
  </Provider>
));

function loadStories() {
  /**
   * Loads everything in ../app/components with
   * suffix .stories.js
   */
  const req = require.context('../app', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

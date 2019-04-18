/**
 * Container Generator
 */

const fs = require('fs');
const path = require('path');
const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'location',
      message: 'Which subfolder of app/containers do you want the container placed in?',
      default: './',
      validate: value => {
        const location = path.resolve('./app/containers', `${value}`);
        if (!fs.existsSync(location)) {
          return `${location} does not exist.`;
        }
        return true;
      },
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var componentTemplate; // eslint-disable-line no-var

    switch (data.type) {
      default: {
        componentTemplate = './container/class.js.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: path.resolve('./app/containers/', data.location, '{{properCase name}}/index.js'),
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve('./app/containers/', data.location, '{{properCase name}}/apiCalls.js'),
        templateFile: './container/apiCalls.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve('./app/containers/', data.location, '{{properCase name}}/tests/index.test.js'),
        templateFile: './container/test.js.hbs',
        abortOnFail: true,
      },
    ];

    actions.push({
      type: 'add',
      path: path.resolve('./app/containers/', data.location, '{{properCase name}}/messages.js'),
      templateFile: './container/messages.js.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: path.resolve('./app/containers/', data.location, '{{properCase name}}/Loadable.js'),
      templateFile: './component/loadable.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'prettify',
      path: '/containers/',
    });

    return actions;
  },
};

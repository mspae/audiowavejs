import sinon from 'sinon';
sinon.behavior = require('sinon/lib/sinon/behavior');
global.window = {};
sinon.defaultConfig = {
  injectInto: null,
  properties: ['spy', 'stub', 'mock', 'clock', 'server', 'requests'],
  useFakeTimers: true,
  useFakeServer: true,
};

require('./indexSpec.js');
require('./fileopSpec.js');
require('./processorSpec.js');

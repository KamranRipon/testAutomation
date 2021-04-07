import {TestConstants} from './src/utils/TestConstants';
const devices = require('./src/utils/devices');

module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  reporters: [
    'default',
    ['jest-junit',
      {
        suiteName: 'jest tests',
        // eslint-disable-next-line max-len
        outputName: `./src/output/${TestConstants.browser}_${TestConstants.device}_junit.xml`,
      },
    ],
  ],
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: [TestConstants.browser],
      launchOptions: {
        headless: TestConstants.headless,
      },
      devices: [
        devices[TestConstants.device],
      ],
    },
  },
};

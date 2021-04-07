require('ts-node/register');
const {TestConstants} = require('./src/utils/TestConstants');
const {setHeadlessWhen} = require('@codeceptjs/configure');
const devices = require('./src/utils/devices');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './src/tests/*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: TestConstants.baseUrl,
      show: TestConstants.show,
      browser: TestConstants.browser,
      waitForNavigation: 'domcontentloaded',
      emulate: devices[TestConstants.device],
    },
  },
  include: {
    I: './src/steps_file.ts',
  },
  bootstrap: null,
  mocha: {
    reporterOptions: {
      'mocha-junit-reporter': {
        'stdout': './output/console.log',
        'options': {
          'mochaFile': './output/result.xml',
          'attachments': true, // add screenshot for a failed test
        },
      },
      'codeceptjs-cli-reporter': {
        'stdout': '-',
        'options': {
          'verbose': true,
          'steps': true,
        },
      },
    },
  },
  name: 'conplat.e2etest',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};

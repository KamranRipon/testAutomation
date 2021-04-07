# 0. Introduction

This repository gathers all kind of system integrationtests for the conversational platform. This repository is build around [playwright](https://playwright.dev/), because playwright can run tests in all 3 mayor browsers (chromium, firefox and <b>webkit</b>) and playwright is capable to simulate mobile devices and gestures.

# 0.1 Installation
It is easy to setup your local environment. Just install [nodejs LTS](https://nodejs.org/en/) and install all packages with npm:

```bash
npm install
```

# 1. Configuration
It is not necessary to set any environment variables to run our tests. If you want to customize the test execution, then take a look at ./src/utils/TestConstants.ts.
```js
/**
 * This class holds the configuration variables
 * which are needed to differentiate between the target test environments.
 */
export class TestConstants {
  /**
   * Default url to open
   */
  static baseUrl: string =
    process.env.BASEURL ?
    process.env.BASEURL :
    'https://ai.dataport.de/conplat/chat/';

  /**
   * Defines if the test will be ran in headless ur headful mode
   */
  static HEADLESS =
    process.env.HEADLESS ?
    process.env.HEADLESS :
    true;

  /**
   * Defines which browser will be used while executing the tests
   */
  static browser =
    process.env.BROWSER ?
    process.env.BROWSER :
    'chromium';

  /**
   * Defines which device will be simulated while executing tests
   */
  static device =
    process.env.DEVICE ?
    process.env.DEVICE :
    'iPhone 11 Pro';
};
```
# 2. Run your tests

```bash
npx codeceptjs run --steps
```
# 3. Continues Testing
This chapter is all about running your playwright e2etests in a <u>local</u> docker container for debugging purposes.

## 3.1 Build docker image

You can execute the docker-build script (located: ./deployment/docker-build.sh) to generate an image with your e2e tests:

```bash
chmod u+x deployment/docker-build.sh
./deployment/docker-build.sh
```

Don't forget to set your proxies if you are in our corporate network:
```bash
export HTTP_PROXY=http://141.91.176.130:80
export HTTPS_PROXY=http://141.91.176.130:80
```

## 3.2 Run docker container

All required prerequisites are done to execute our tests in a docker container. Just run the script docker-run (located in ./deployment/docker-run.sh):
```

```
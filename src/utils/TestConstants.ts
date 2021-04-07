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
  static headless =
    process.env.HEADLESS ?
    process.env.HEADLESS :
    false;

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

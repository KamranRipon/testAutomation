module.exports = {
  'Desktop': {
    'name': 'Desktop',
    // eslint-disable-next-line max-len
    'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36+ (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.3+',
    'viewport': {
      'width': 1920,
      'height': 1080,
    },
    'deviceScaleFactor': 1,
    'isMobile': false,
    'hasTouch': false,
    'defaultBrowserType': 'chromium',
  },
  'iPhone 11 Pro': {
    'name': 'iPhone 11 Pro',
    // eslint-disable-next-line max-len
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1',
    'viewport': {
      'width': 375,
      'height': 812,
    },
    'deviceScaleFactor': 3,
    'isMobile': true,
    'hasTouch': true,
    'defaultBrowserType': 'webkit',
  },
};

/* eslint @typescript-eslint/no-var-requires: "off" */

import develop from '../../src/config/develop';
import prod from '../../src/config/prod';

describe('Config - ', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('config for dev environment', () => {
    // Set the variables
    process.env.NODE_ENV = 'dev';

    const config = require('../../src/config/config');
    
    expect(config).toStrictEqual(develop);
  });

  test('config for unknow environment', () => {
    // Set the variables
    process.env.NODE_ENV = 'undefined';

    const config = require('../../src/config/config');
    
    expect(config).toStrictEqual(develop);
  });

  test('config for undefined environment', () => {
    // Set the variables
    process.env.NODE_ENV = undefined;

    const config = require('../../src/config/config');
    
    expect(config).toStrictEqual(develop);
  });

  test('config for prod environment', () => {
    // Set the variables
    process.env.NODE_ENV = 'prod';

    const config = require('../../src/config/config');
    
    expect(config).toStrictEqual(prod);
  });
});
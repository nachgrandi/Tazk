import develop from './develop';
import prod from './prod';

const configs: any = {
  dev: develop,
  prod: prod
};

const environment: string = process.env.NODE_ENV || 'dev';

export = configs[environment] || develop;
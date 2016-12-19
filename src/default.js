import { createTransform } from 'redux-persist';
import { makeEncryptor, makeDecryptor } from './helpers';

export default config => {
  const inbound = makeEncryptor(config.secretKey);
  const outbound = makeDecryptor(config.secretKey);

  return createTransform(inbound, outbound, config);
};

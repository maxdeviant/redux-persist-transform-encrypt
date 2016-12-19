import { createTransform } from 'redux-persist';
import { makeProgressiveEncryptor, makeProgressiveDecryptor } from './helpers';

export default config => {
  const inbound = makeProgressiveEncryptor(config.secretKey);
  const outbound = makeProgressiveDecryptor(config.secretKey);

  return createTransform(inbound, outbound, config);
};

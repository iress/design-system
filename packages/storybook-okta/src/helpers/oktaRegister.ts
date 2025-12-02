import OktaAuth from '@okta/okta-auth-js';
import type { AddonConfig } from '../types';
import { validateOktaConfig } from '../validation';

console.log('OKTA REGISTER LOADED');

const oktas = new Map<string, OktaAuth>();

const getKey = (okta: AddonConfig) => {
  return `${okta.issuer}-${okta.clientId}`;
};

export const registerOkta = (okta: AddonConfig) => {
  const validatedConfig = validateOktaConfig(okta);
  oktas.set(getKey(validatedConfig), new OktaAuth(validatedConfig));
  return getOkta(validatedConfig)!;
};

export const unregisterOkta = (okta: AddonConfig) => {
  oktas.delete(getKey(okta));
};

export const getOkta = (okta: AddonConfig) => {
  return oktas.get(getKey(okta)) ?? [...oktas.values()][0];
};

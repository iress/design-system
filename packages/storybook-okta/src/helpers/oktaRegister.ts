import OktaAuth from '@okta/okta-auth-js';
import { type AddonConfig } from '../types';

const oktas = new Map<string, OktaAuth>();

const getKey = (okta: AddonConfig) => {
  return `${okta.issuer}-${okta.clientId}`;
};

export const registerOkta = (okta: AddonConfig) => {
  oktas.set(getKey(okta), new OktaAuth(okta));
  return getOkta(okta)!;
};

export const unregisterOkta = (okta: AddonConfig) => {
  oktas.delete(getKey(okta));
};

export const getOkta = (okta: AddonConfig) => {
  return oktas.get(getKey(okta)) ?? [...oktas.values()][0];
};

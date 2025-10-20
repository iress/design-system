import * as IDS from '@iress-oss/ids-components';
import { omit } from 'radash';

export const SCOPE = {
  ...omit(IDS, ['ToasterContextValue' as keyof typeof IDS]),
};

export default SCOPE;

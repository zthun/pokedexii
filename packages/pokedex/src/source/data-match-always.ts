import { stubTrue } from 'lodash';
import { IZDataMatch } from './data-match';

/**
 * A data match that always matches.
 */
export class ZDataMatchAlways implements IZDataMatch<any, any> {
  match = stubTrue;
}

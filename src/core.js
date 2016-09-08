/**
 * Created by ray.xie on 9/8/2016.
 */

import { List } from 'immutable';

export default function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

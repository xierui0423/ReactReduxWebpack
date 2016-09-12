/**
 * Created by ray.xie on 9/12/2016.
 */

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import makeStore from '../src/store';

describe('store', () => {
  it('is a Redux store configured with the correct reducer', () => {
    const appStore = makeStore();

    expect(appStore.getState()).to.equal(Map());

    appStore.dispatch({ type: 'SET_ENTRIES', entries: ['topic1', 'topic2'] });

    expect(appStore.getState()).to.equal(fromJS({
      entries: ['topic1', 'topic2'],
    }));
  });
});

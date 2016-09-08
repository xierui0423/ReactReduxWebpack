/**
 * Created by ray.xie on 9/8/2016.
 */

import { expect } from 'chai';
import { List, Map } from 'immutable';
import setEntries from '../src/core';


describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('topic1', 'topic2');
      const nextState = setEntries(state, entries);

      expect(state).to.equal(Map());
      expect(nextState).to.equal(Map({ entries: List.of('topic1', 'topic2') }));
    });
  });
});

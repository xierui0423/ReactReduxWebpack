/**
 * Created by ray.xie on 9/9/2016.
 */

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer.js';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting'],
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later'],
    });
    const action = { type: 'NEXT' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
      },
      entries: [],
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
      },
      entries: [],
    });
    const action = { type: 'VOTE', entry: 'Trainspotting' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: { Trainspotting: 1 },
      },
      entries: [],
    }));
  });

  it('has initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['topic1'] };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['topic1'],
    }));
  });

  it('can be used as chained reducing calls', () => {
    const actions = [
      { type: 'SET_ENTRIES', entries: ['topic1', 'topic2', 'topic3', 'topic4'] },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'topic1' },
      { type: 'VOTE', entry: 'topic2' },
      { type: 'VOTE', entry: 'topic1' },
      { type: 'VOTE', entry: 'topic1' },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'topic3' },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'topic3' },
      { type: 'NEXT' },
      { type: 'NEXT' },
      { type: 'NEXT' },
    ];

    const nextState = actions.reduce(reducer, undefined);

    expect(nextState).to.equal(fromJS({
      winner: 'topic3',
    }));
  });
});

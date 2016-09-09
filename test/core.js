/**
 * Created by ray.xie on 9/8/2016.
 */

import { expect } from 'chai';
import { List, Map } from 'immutable';
import { setEntries, next, vote } from '../src/core';


describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('topic1', 'topic2');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({ entries: List.of('topic1', 'topic2') }));
    });

    it('converts the entries to immutable', () => {
      const state = Map();
      const entries = ['topic1', 'topic2'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({ entries: List.of('topic1', 'topic2') }));
    });
  });

  describe('next', () => {
    it('takes two entries into the vote map', () => {
      const state = Map({ entries: List.of('topic1', 'topic2', 'topic3') });
      const nextState = next(state);

      expect(nextState).to.equal(Map(
        {
          entries: List.of('topic3'),
          vote: Map({ pair: List.of('topic1', 'topic2') }),
        }));
    });

    it('puts winner entry back into the entry list, dump the loser entry', () => {
      // To test the situation that one entry has not been voted
      let state = Map({
        vote: Map({ pair: List.of('topic1', 'topic2'), tally: Map({ topic1: 3 }) }),
        entries: List.of('topic3', 'topic4'),
      });
      state = next(state);

      expect(state).to.equal(Map(
        {
          entries: List.of('topic1'),
          vote: Map({ pair: List.of('topic3', 'topic4') }),
        }));

      // To test the situation that both entries have been voted
      state = Map({
        vote: Map({ pair: List.of('topic1', 'topic2'), tally: Map({ topic1: 4, topic2: 5 }) }),
        entries: List.of('topic3', 'topic4'),
      });

      state = next(state);

      expect(state).to.equal(Map(
        {
          entries: List.of('topic2'),
          vote: Map({ pair: List.of('topic3', 'topic4') }),
        }));
    });

    it('puts winner entries (on tie) back into the entry list', () => {
      // To test the situation that both entries have not been voted
      let state = Map({
        vote: Map({ pair: List.of('topic1', 'topic2') }),
        entries: List.of('topic3', 'topic4'),
      });

      state = next(state);

      expect(state).to.equal(Map(
        {
          entries: List.of('topic1', 'topic2'),
          vote: Map({ pair: List.of('topic3', 'topic4') }),
        }));

      // To test the situation that both entries have been voted
      state = Map({
        vote: Map({ pair: List.of('topic1', 'topic2'), tally: Map({ topic1: 5, topic2: 5 }) }),
        entries: List.of('topic3', 'topic4'),
      });

      state = next(state);

      expect(state).to.equal(Map(
        {
          entries: List.of('topic1', 'topic2'),
          vote: Map({ pair: List.of('topic3', 'topic4') }),
        }));
    });

    it('displays the final winner when there is only one entry left', () => {
      let state = Map({
        vote: Map({ pair: List.of('topic1', 'topic2'), tally: Map({ topic1: 2, topic2: 1 }) }),
        entries: List(),
      });

      state = next(state);

      expect(state).to.equal(Map(
        {
          winner: 'topic1',
        }));
    });

    it('does nothing when there are not entries for next step', () => {
      let state = Map();

      state = next(state);

      expect(state).to.equal(Map());
    });
  });

  describe('vote', () => {
    it('creates a new tally for a new entry', () => {
      const state = Map({ pair: List.of('topic1', 'topic2') });

      const nextState = vote(state, 'topic2');

      expect(nextState).to.equal(
          Map({ pair: List.of('topic1', 'topic2'), tally: Map({ topic2: 1 }) })
        );
    });

    it('increases vote for the entry with tally', () => {
      const state = Map({ pair: List.of('topic1', 'topic2'), tally: Map({ topic2: 1 }) });

      const nextState = vote(state, 'topic2');

      expect(nextState).to.equal(
        Map({ pair: List.of('topic1', 'topic2'), tally: Map({ topic2: 2 }) })
      );
    });

    it('does nothing when invalid entry name is given', () => {
      const state = Map(
        {
          entries: List.of('topic3'),
          vote: Map({ pair: List.of('topic1', 'topic2'), tally: Map({ topic2: 1 }) }),
        });

      const nextState = vote(state, 'topic3');

      expect(nextState).to.equal(state);
    });
  });
});

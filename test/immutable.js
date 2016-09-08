/**
 * Created by ray.xie on 9/8/2016.
 */

import { expect } from 'chai';
import { List, Map } from 'immutable';

describe('immutability', () => {
  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      const state = 42;
      const nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a list', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      const state = List.of('Trainspotting', '28 Days Later');
      const nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(List.of('Trainspotting', '28 Days Later', 'Sunshine'));
      expect(state).to.equal(List.of('Trainspotting', '28 Days Later'));
    });
  });

  describe('a map', () => {
    function addMovie(currentState, movie) {
      return currentState.update('movies', movies => movies.push(movie));
    }

    it('is immutable', () => {
      const state = Map({ movies: List.of('Trainspotting', '28 Days Later') });
      const nextState = addMovie(state, 'Sunshine');

      expect(nextState)
        .to
        .equal(Map({ movies: List.of('Trainspotting', '28 Days Later', 'Sunshine') }));
      expect(state).to.equal(Map({ movies: List.of('Trainspotting', '28 Days Later') }));
    });
  });
});

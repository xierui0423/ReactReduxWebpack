/**
 * Created by ray.xie on 9/8/2016.
 */

import { List, Map } from 'immutable';

function getWinner(voteState) {
  const [firstEntry, lastEntry] = voteState.get('pair', List.of('', '')).toArray();

  // Return no winner if there is no tally
  if (!firstEntry || !lastEntry) return [];

  const [firstEntryTally, lastEntryTally] =
    [voteState.getIn(['tally', firstEntry], 0), voteState.getIn(['tally', lastEntry], 0)];

  if (firstEntryTally > lastEntryTally) return [firstEntry];
  else if (firstEntryTally < lastEntryTally) return [lastEntry];

  return [firstEntry, lastEntry];
}

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const winner = getWinner(state.get('vote', Map()));

  const entries = state.get('entries').concat(winner);

  // We got the final winner, hooray!!
  if (entries.size === 1) {
    return state.remove('vote').remove('entries').set('winner', entries.first());
  }

  return state.merge({ vote: Map({ pair: entries.take(2) }), entries: entries.skip(2) });
}

export function vote(state, entry) {
  if (!state.getIn(['vote', 'pair'], List()).contains(entry)) return state;

  return state.updateIn(['vote', 'tally', entry], 0, val => val + 1);
}

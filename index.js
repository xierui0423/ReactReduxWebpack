/**
 * Created by ray.xie on 9/12/2016.
 */

import makeStore from './src/store';
import startServer from './src/server';

const initialEntries = require('./entries.json');

// Default app store
const appStore = makeStore();
export default appStore;

startServer(appStore);

appStore.dispatch({
  type: 'SET_ENTRIES',
  entries: initialEntries,
});

appStore.dispatch({ type: 'NEXT' });

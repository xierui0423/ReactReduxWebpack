/**
 * Created by ray.xie on 9/12/2016.
 */

import { createStore } from 'redux';
import reducer from './reducer';

export default () => createStore(reducer);

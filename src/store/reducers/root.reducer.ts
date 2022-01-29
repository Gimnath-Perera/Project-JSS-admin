import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { CLEAR_REDUX_STORE } from '../../constants/common-constant';

import commonReducer from './common.reducer';
import authReducer from './auth.reducer';
import workerReducer from './worker.reducer';
import customerReducer from './customer.reducer';
import companySiteReducer from './company-site.reducer';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['common', 'worker', 'customer', 'companySite']
};

const appReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  worker: workerReducer,
  customer: customerReducer,
  companySite: companySiteReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === CLEAR_REDUX_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);

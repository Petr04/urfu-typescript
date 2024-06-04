import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';

const store: ReturnType<typeof configureStore> = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;
export type RootState = {
  user: ReturnType<typeof userReducer>;
};
export type AppDispatch = typeof store.dispatch;

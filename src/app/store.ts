import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fsmBuilderReducer from '../features/fsm/redux/fsmBuilderSlice';

export const store = configureStore({
  reducer: {
    fsmBuilder: fsmBuilderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

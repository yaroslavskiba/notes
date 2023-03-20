import { configureStore } from '@reduxjs/toolkit';
import reducerNotes from './slices/notes-state';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    notesList: reducerNotes,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

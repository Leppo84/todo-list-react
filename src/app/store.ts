import { configureStore } from "@reduxjs/toolkit";
import taskreducer from '../features/task-slice';

export const store = configureStore({
  reducer: {
    taskManager:  taskreducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


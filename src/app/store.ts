import { configureStore } from '@reduxjs/toolkit';
import launchesReducer from '../features/launches/launches.slice';
import rocketReducer from '../features/rockets/rockets.slice';
import usersReducer from '../features/users/users.slice';
import shipsReducer from '../features/ships/ships.slice';

export const store = configureStore({
    reducer: {
        launches: launchesReducer,
        rockets: rocketReducer,
        users: usersReducer,
        ships: shipsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
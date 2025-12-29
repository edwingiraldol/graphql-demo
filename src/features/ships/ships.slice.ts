import { createSlice } from '@reduxjs/toolkit';
import type { ShipsState } from '../../types/ship.types';
import { fetchShips } from './ships.thunks';

const initialState: ShipsState = {
    list: [],
    loading: false,
    error: null,
};

const shipsSlice = createSlice({
    name: 'ships',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShips.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload ?? [];
            })
            .addCase(fetchShips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch ships';
            });
    },
});

export default shipsSlice.reducer;
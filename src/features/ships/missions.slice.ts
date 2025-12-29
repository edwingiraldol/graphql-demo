import { createSlice } from '@reduxjs/toolkit';
import type { MissionsState } from '../../types/mission.types';
import { fetchMissions } from './missions.thunks';

const initialState: MissionsState = {
    list: [],
    loading: false,
    error: null,
};

const missionsSlice = createSlice({
    name: 'missions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMissions.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload ?? [];
            })
            .addCase(fetchMissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch missions';
            });
    },
});

export default missionsSlice.reducer;
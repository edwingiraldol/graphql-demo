import { createSlice } from '@reduxjs/toolkit';
import { fetchLaunches } from './launches.thunks';
import { type Launch } from '../../types/launch.types';

type State = {
    list: Launch[];
    loading: boolean;
    error: string | null;
    filters: { year: string; success: boolean | null };
};

const initialState: State = {
    list: [],
    loading: false,
    error: null,
    filters: { year: '', success: null },
};

const slice = createSlice({
    name: 'launches',
    initialState,
    reducers: {
        setYear(state, action) {
            state.filters.year = action.payload;
        },
        setSuccess(state, action) {
            state.filters.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLaunches.pending, (s) => {
                s.loading = true;
                s.error = null;
            })
            .addCase(fetchLaunches.fulfilled, (s, a) => {
                s.loading = false;
                s.list = a.payload;
            })
            .addCase(fetchLaunches.rejected, (s, a) => {
                s.loading = false;
                s.error = a.error.message || 'Error';
            });
    },
});

export const { setYear, setSuccess } = slice.actions;
export default slice.reducer;

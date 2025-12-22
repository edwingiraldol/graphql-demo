import { createSlice } from '@reduxjs/toolkit';
import { fetchRockets } from './rockets.thunks';
import { type Rocket } from '../../types/rocket.types';

type State = {
    list: Rocket[];
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
    name: 'rockets',
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
            .addCase(fetchRockets.pending, (s) => {
                s.loading = true;
                s.error = null;
            })
            .addCase(fetchRockets.fulfilled, (s, a) => {
                s.loading = false;
                s.list = a.payload;
            })
            .addCase(fetchRockets.rejected, (s, a) => {
                s.loading = false;
                s.error = a.error.message || 'Error';
            });
    },
});

export const { setYear, setSuccess } = slice.actions;
export default slice.reducer;
import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchLaunches as serviceFetch} from '../../core/services/spacex.service';

export const fetchLaunches = createAsyncThunk(
    'launches/fetch',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const { year, success } = state.launches.filters;
            console.log(year);
            return await serviceFetch({year: year || null, success});
        } catch (err: any) {
            return rejectWithValue(err.message || 'Error fetching launches');
        }
    }
);


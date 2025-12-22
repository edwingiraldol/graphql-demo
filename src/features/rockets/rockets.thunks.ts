import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchRockets as serviceFetch} from '../../core/services/spacex.service';

export const fetchRockets = createAsyncThunk(
    'rockets/fetch',
    async (_, {rejectWithValue }) => {
        try {
            return await serviceFetch({limit:50});
        } catch (err: any) {
            return rejectWithValue(err.message || 'Error fetching launches');
        }
    }
);


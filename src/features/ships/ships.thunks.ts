import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShips as fetchShipsService } from '../../core/services/spacex.service';
import type { Ship } from '../../types/ship.types';

export const fetchShips = createAsyncThunk<Ship[] | undefined>(
    'ships/fetchShips',
    async () => {
        return await fetchShipsService({ limit: 100 });
    }
);
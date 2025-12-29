import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMissions as fetchMissionsService } from '../../core/services/spacex.service';
import type { Mission } from '../../types/mission.types';

export const fetchMissions = createAsyncThunk<Mission[] | undefined>(
    'missions/fetchMissions',
    async () => {
        return await fetchMissionsService({ limit: 100 });
    }
);
import {createAsyncThunk} from '@reduxjs/toolkit';
import type {User} from '../../types/user.types';
import {addUserService, deleteUserService, fetchUsersService} from '../../core/services/users.service';

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    'users/fetchUsers',
    async (_, thunkAPI) => {
        try {
            const users = await fetchUsersService();
            if (!users) return thunkAPI.rejectWithValue('No users returned');
            return users;
        } catch (err) {
            return thunkAPI.rejectWithValue((err as Error).message ?? 'Failed to fetch users');
        }
    }
);

export const createUser = createAsyncThunk<User, { name: string; email?: string | null }>(
    'users/createUser',
    async (payload) => {
        return await addUserService(payload);
    }
);

export const removeUser = createAsyncThunk<string, string>(
    'users/removeUser',
    async (id) => {
        await deleteUserService(id);
        return id;
    }
);
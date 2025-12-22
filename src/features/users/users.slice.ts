import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user.types';
import { fetchUsers, createUser, removeUser } from './users.thunks';

type State = {
    items: User[];
    loading: boolean;
    error: string | null;
};

const initialState: State = {
    items: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // reducers opcionales si se necesitan acciones locales
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch users';
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.items.unshift(action.payload);
            })
            .addCase(removeUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter((u) => u.id !== action.payload);
            });
    },
});

export default usersSlice.reducer;

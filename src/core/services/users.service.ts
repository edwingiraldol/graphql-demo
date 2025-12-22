// File: src/core/services/users.service.ts
import {CREATE_USER_MUTATION, DELETE_USER_MUTATION, GET_USERS} from '../queries/users.query';
import {graphqlRequest} from '../graphql/client';
import type {User} from '../../types/user.types';

type FetchUsersArgs = {
    limit?: number;
};

type GraphQLError = { message: string; [k: string]: unknown };
type GraphQLResult<T> = { data?: T; errors?: GraphQLError[] };

function toUser(raw: Record<string, unknown>): User {
    const id = raw.id ?? '';
    const name = raw.name ?? '';
    return {
        id: String(id),
        name: String(name),
    };
}

export async function fetchUsers({ limit = 100 }: FetchUsersArgs = {}): Promise<User[] | undefined> {
    try {
        const resp = await graphqlRequest<GraphQLResult<{ users: Array<Record<string, unknown>> }>>(GET_USERS, { limit });

        const errors = resp?.errors;
        const data = resp?.data;

        if (errors && errors.length) {
            console.warn('GraphQL returned errors for GET_USERS:', errors);
            return;
        }

        const usersRaw = data?.users;
        if (!usersRaw) {
            console.warn('GET_USERS returned no data, using local storage fallback.');

            return;
        }

        return usersRaw.map((raw) => toUser(raw));
    } catch (err) {
        console.warn('fetchUsers failed, using local storage fallback.', err);
        return;
    }
}

// Alias para compatibilidad con los thunks
export const fetchUsersService = fetchUsers;


export async function addUserService(payload: { name: string; email?: string | null }): Promise<User> {
    const variables = { name: payload.name };
    const resp = await graphqlRequest<
        GraphQLResult<{ insert_users: { returning: Array<Record<string, unknown>> } }>
    >(CREATE_USER_MUTATION, variables);

    if (resp?.errors && resp.errors.length) {
        throw new Error('GraphQL insert_users returned errors: ' + JSON.stringify(resp.errors));
    }

    const returning = resp?.data?.insert_users?.returning;
    if (!returning || returning.length === 0) {
        throw new Error('insert_users returned null or empty. Revisar permisos, constraints o variables enviadas.');
    }

    const created = returning[0];
    return toUser(created);
}

export async function deleteUserService(id: string): Promise<string> {
    const resp = await graphqlRequest<GraphQLResult<{ deleteUser: { id: string } }>>(DELETE_USER_MUTATION, { id });

    if (resp?.errors && resp.errors.length) {
        throw new Error('GraphQL deleteUser returned errors: ' + JSON.stringify(resp.errors));
    }

    const deleted = resp?.data?.deleteUser;
    if (!deleted || !deleted.id) {
        throw new Error('deleteUser returned no data');
    }

    return String(deleted.id);
}
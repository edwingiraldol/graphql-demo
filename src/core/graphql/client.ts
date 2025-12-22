export const GRAPHQL_ENDPOINT = 'https://spacex-production.up.railway.app';

export async function graphqlRequest<T = any>(
    query: string,
    variables?: Record<string, unknown>
): Promise<T> {
    console.log(variables);
    const res = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: variables || {} }),
    });

    console.log(res);
    if (!res.ok) {
        throw new Error(`Network error: ${res.status} ${res.statusText}`);
    }

    const body = await res.json();
    if (body.errors && body.errors.length) {
        throw new Error(body.errors.map((e: any) => e.message).join(', '));
    }

    return body.data as T;
}
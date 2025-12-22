import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUsers, createUser, removeUser } from './users.thunks';

export function UsersList(){
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((s) => s.users);
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const onAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        dispatch(createUser({ name: name.trim()}));
        setName('');
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Users</h2>

            <form onSubmit={onAdd} className="mb-4 flex gap-2">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    className="border px-2 py-1 rounded flex-1"
                />
                <button type="submit" className="bg-blue-600 text-white px-3 rounded">Agregar</button>
            </form>

            {loading && <div>Cargando...</div>}
            {error && <div className="text-red-600">Error: {error}</div>}

            <ul className="space-y-2">
                {items.map((u) => (
                    <li key={u.id} className="flex justify-between items-center border px-3 py-2 rounded">
                        <div>
                            <div className="font-medium">{u.name}</div>
                        </div>
                        <button
                            onClick={() => dispatch(removeUser(u.id))}
                            className="text-sm text-red-600"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
                {items.length === 0 && !loading && <li>No hay usuarios.</li>}
            </ul>
        </div>
    );
}
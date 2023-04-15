import { client } from '@/services/client';
import { User } from './type';

export function getUsers(endpoint: string) {
    return client.get(endpoint).then((res) => res.data);
}

export function updateUser(userId: number, data: User | {}) {
    return client.put(`/users/${userId}`, data).then(res => {
        const { status, data } = res
        return { status, data }
    })
}
export type Room = {
  _id: string;
  number: number;
  type: string;
  isBooked: boolean;
  booking?: {
    guestName?: string;
    fromDate?: string;
    toDate?: string;
    price?: number;
    notes?: string;
  };
};

export type RoomsSummary = {
  hotel: { name: string; totalRooms: number };
  summary: { total: number; available: number; booked: number };
  rooms: Array<{
    id: number;
    mongoId: string;
    number: number;
    isBooked: boolean;
    booking?: Room['booking'];
    type: string;
  }>;
};

const BASE = 'http://localhost:3000';

async function json<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const fetchRoomsSummary = () => json<RoomsSummary>('/api/rooms/summary');
export const fetchRooms = () => json<Room[]>('/api/rooms');
export const fetchRoomById = (roomId: number | string) => json<Room>(`/api/rooms/${roomId}`);
export const bookSpecificRoom = (roomId: number | string, body: any) =>
  json(`/api/rooms/${roomId}/book`, { method: 'POST', body: JSON.stringify(body) });
export const updateBookedRoom = (roomId: number | string, body: any) =>
  json(`/api/rooms/${roomId}`, { method: 'PUT', body: JSON.stringify(body) });
export const checkoutRoom = (roomId: number | string) =>
  json(`/api/rooms/${roomId}/checkout`, { method: 'DELETE' });
export const login = (body: any) =>
  json(`/api/auth/login`, { method: 'POST', body: JSON.stringify(body) });


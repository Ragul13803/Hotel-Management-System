// ==================== TYPE DEFINITIONS ====================

export type Room = {
  _id: string;
  number: number;
  type: string;
  isBooked: boolean;
  booking?: {
    guestName?: string;
    guestEmail?: string;
    fromDate?: string;
    toDate?: string;
    price?: number;
    notes?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type RoomsSummary = {
  hotel: { 
    name: string; 
    totalRooms: number;
    roomType?: string;
    complementaryBreakfast?: boolean;
    conditions?: string;
    basePricePerDay?: number;
  };
  summary: { 
    total: number; 
    available: number; 
    booked: number;
  };
  rooms: Array<{
    id: string;
    mongoId: string;
    number: number;
    isBooked: boolean;
    booking?: Room['booking'];
    type: string;
    createdAt?: string;
    updatedAt?: string;
  }>;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthResponse = {
  token: string;
  userId: string;
  user: User;
};

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignInFormData = {
  email: string;
  password: string;
};

export type BookingData = {
  guestName?: string;
  guestEmail?: string;
  fromDate: string;
  toDate: string;
  price?: number;
  notes?: string;
};

export type CustomerBooking = {
  id: string;
  mongoId: string;
  roomNumber: number;
  type: string;
  fromDate?: string;
  toDate?: string;
  price?: number;
  notes?: string;
  guestName?: string;
  createdAt?: string;
  updatedAt?: string;
};

// ==================== BASE CONFIGURATION ====================

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// ==================== HELPER FUNCTION ====================

async function json<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem('session_id');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(init?.headers || {}),
  };

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }

  return res.json();
}

// ==================== AUTH FUNCTIONS ====================

export const register = (body: RegisterFormData) =>
  json<AuthResponse>('/api/users/register', {
    method: 'POST',
    body: JSON.stringify(body),
  }).then((data) => {
    // Store token after successful registration
    if (data.token) {
      localStorage.setItem('session_id', data.token);
      localStorage.setItem('user_id', data.userId);
      console.log('✅ Registration successful, token stored');
    }
    return data;
  });

export const signIn = (body: SignInFormData) =>
  json<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  }).then((data) => {
    // Store token after successful login
    if (data.token) {
      localStorage.setItem('session_id', data.token);
      localStorage.setItem('user_id', data.userId);
      console.log('✅ Login successful, token stored');
    }
    return data;
  });

export const validateToken = () =>
  json<{ ok: boolean; mongoState: number; totalRoomsInDb: number; message: string }>(
    '/api/health'
  );

export const fetchCurrentUser = () => json<User>('/api/users/me');

export const signOut = async () => {
  try {
    await json('/api/auth/logout', { method: 'POST' });
  } catch (error) {
    console.log('Logout API call failed, continuing with local cleanup');
  }

  // Clear localStorage
  localStorage.removeItem('session_id');
  localStorage.removeItem('user_id');
  console.log('✅ Logged out, tokens cleared');

  return { message: 'Logged out successfully' };
};

// ==================== ADMIN ROOM FUNCTIONS ====================

export const fetchRoomsSummary = () => 
  json<RoomsSummary>('/api/rooms/summary');

export const fetchRooms = () => 
  json<Room[]>('/api/rooms');

export const fetchRoomById = (roomId: number | string) =>
  json<Room>(`/api/rooms/${roomId}`);

export const bookAnyRoom = (body: BookingData) =>
  json('/api/rooms/book', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const bookSpecificRoom = (roomId: number | string, body: BookingData) =>
  json(`/api/rooms/${roomId}/book`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const updateBookedRoom = (roomId: number | string, body: Partial<BookingData>) =>
  json(`/api/rooms/${roomId}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

export const checkoutRoom = (roomId: number | string) =>
  json(`/api/rooms/${roomId}/checkout`, {
    method: 'DELETE',
  });

// ==================== CUSTOMER FUNCTIONS (Protected) ====================

export const fetchCustomerRoomSummary = () =>
  json<RoomsSummary>('/api/customer/rooms/summary');

export const fetchCustomerRooms = () =>
  json<Array<{
    id: string;
    mongoId: string;
    number: number;
    type: string;
    isBooked: boolean;
  }>>('/api/customer/rooms');

export const customerBookRoom = (
  roomId: number | string,
  body: { fromDate: string; toDate: string; notes?: string }
) =>
  json(`/api/customer/rooms/${roomId}/book`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const fetchCustomerBookings = () =>
  json<CustomerBooking[]>('/api/customer/my-bookings');

// ==================== PUBLIC FUNCTIONS (No Auth) ====================

export const fetchPublicRoomSummary = () =>
  json<RoomsSummary>('/api/public/rooms/summary');

export const fetchPublicRooms = () =>
  json<Array<{
    id: string;
    number: number;
    isBooked: boolean;
    type: string;
  }>>('/api/public/rooms');

export const publicBookRoom = (roomId: number | string, body: BookingData) =>
  json(`/api/public/rooms/${roomId}/book`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const publicBookMultipleRooms = (body: {
  count: number;
  guestName: string;
  guestEmail: string;
  fromDate: string;
  toDate: string;
  notes?: string;
}) =>
  json('/api/public/rooms/book-multiple', {
    method: 'POST',
    body: JSON.stringify(body),
  });

// ==================== LEGACY ALIAS (for backward compatibility) ====================

export const login = signIn;

// ==================== UTILITY FUNCTIONS ====================

export const clearAllStorage = () => {
  localStorage.clear();
  sessionStorage.clear();

  // Clear cookies
  document.cookie.split(';').forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });

  console.log('✅ All storage cleared');
};
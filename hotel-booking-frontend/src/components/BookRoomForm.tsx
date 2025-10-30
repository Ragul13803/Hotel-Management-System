import React, { useEffect, useMemo, useState } from 'react';
import { fetchRooms } from '../lib/rooms-api';

type BookingData = {
  guestName?: string;
  fromDate?: string;
  toDate?: string;
  price?: number;
  notes?: string;
  roomId?: string | number;
};

type Props = {
  existingData?: BookingData;
  mode?: "book" | "update";
  onSubmit: (formData: BookingData) => Promise<void>;
  onClose: () => void;
};

const toDateInput = (d?: string) => {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return '';
  return dt.toISOString().slice(0, 10);
};

const BookRoomForm: React.FC<Props> = ({ existingData, mode = "book", onSubmit, onClose }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [guestName, setGuestName] = useState(existingData?.guestName || '');
  const [fromDate, setFromDate] = useState(toDateInput(existingData?.fromDate));
  const [toDate, setToDate] = useState(toDateInput(existingData?.toDate));
  const [price, setPrice] = useState(existingData?.price?.toString() || '');
  const [notes, setNotes] = useState(existingData?.notes || '');
  const [roomId, setRoomId] = useState<string>(existingData?.roomId?.toString() || '');

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchRooms();
        setRooms(list);

        if (!roomId && mode === "book") {
          const firstAvail = list.find(r => !r.isBooked);
          if (firstAvail) setRoomId(String(firstAvail.number));
        }
      } catch {
        setRooms([]);
      }
    })();
  }, [mode, roomId]);

  // When existingData changes (e.g., selecting a different room), update form fields
  useEffect(() => {
    setGuestName(existingData?.guestName || '');
    setFromDate(toDateInput(existingData?.fromDate));
    setToDate(toDateInput(existingData?.toDate));
    setPrice(existingData?.price?.toString() || '');
    setNotes(existingData?.notes || '');
    setRoomId(existingData?.roomId ? String(existingData.roomId) : roomId);
  }, [existingData]);

  const canSubmit = useMemo(() => {
    if (mode === "update") return Boolean(roomId);
    return Boolean(guestName && roomId);
  }, [guestName, roomId, mode]);

  const submit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!canSubmit) return;
  setLoading(true);
  setMsg('');
  try {
    await onSubmit({
      guestName,
      fromDate,
      toDate,
      price: price ? Number(price) : undefined,
      notes,
      roomId,
    });
    setMsg(mode === "book" ? 'Booked successfully!' : 'Updated successfully!');
    onClose(); // ✅ close the dialog after successful submit
  } catch (e: any) {
    setMsg(e.message || 'Failed');
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={submit} className="bg-white rounded-lg shadow-sm border p-4 space-y-3">
      <div className="font-semibold">{mode === "book" ? 'Book a Room' : 'Update Booking'}</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          className="border rounded px-3 py-2"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          disabled={mode === "update"}
        >
          {rooms.map(r => (
            <option key={r._id} value={r.number} disabled={r.isBooked && mode === "book"}>
              Room {r.number} {r.isBooked ? '(Booked)' : ''}
            </option>
          ))}
        </select>
        <input
          className="border rounded px-3 py-2"
          placeholder="Guest Name"
          value={guestName}
          onChange={e => setGuestName(e.target.value)}
        />
        <input
          type="number"
          className="border rounded px-3 py-2"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input type="date" className="border rounded px-3 py-2" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        <input type="date" className="border rounded px-3 py-2" value={toDate} onChange={e => setToDate(e.target.value)} />
        <input
          className="border rounded px-3 py-2 md:col-span-3"
          placeholder="Notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center gap-6">
        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="bg-green-600 text-white rounded px-4 py-2 disabled:bg-gray-400"
        >
          {loading ? (mode === "book" ? 'Booking...' : 'Updating...') : (mode === "book" ? 'Book' : 'Update')}
        </button>
        <button type="button" onClick={onClose} className="bg-gray-500 text-white rounded px-4 py-2">
          Cancel
        </button>
        {msg && <div className="text-sm text-gray-500">{msg}</div>}
      </div>
    </form>
  );
};

export default BookRoomForm;

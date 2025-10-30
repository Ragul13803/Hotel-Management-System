import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { checkoutRoom, fetchRoomById, updateBookedRoom } from '../lib/rooms-api';

const RoomDetail: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [guestName, setGuestName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [msg, setMsg] = useState('');

  async function load(){
    setLoading(true); setError('');
    try{
      const r = await fetchRoomById(String(roomId||''));
      setRoom(r);
      setGuestName(r.booking?.guestName || '');
      setFromDate(r.booking?.fromDate ? String(r.booking.fromDate).slice(0,10) : '');
      setToDate(r.booking?.toDate ? String(r.booking.toDate).slice(0,10) : '');
      setPrice(r.booking?.price != null ? String(r.booking.price) : '');
      setNotes(r.booking?.notes || '');
    }catch(e:any){ setError(e.message || 'Failed to load room'); }
    finally{ setLoading(false); }
  }

  useEffect(()=>{ load(); }, [roomId]);

  async function onUpdate(e: React.FormEvent){
    e.preventDefault(); setMsg('');
    try{
      await updateBookedRoom(String(roomId||''), {
        guestName: guestName || undefined,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
        price: price ? Number(price) : undefined,
        notes: notes || undefined,
      });
      setMsg('Updated');
      await load();
    }catch(e:any){ setMsg(e.message || 'Update failed'); }
  }

  async function onCheckout(){
    if (!window.confirm('Confirm checkout?')) return;
    try{ await checkoutRoom(String(roomId||'')); navigate('/dashboard'); }
    catch(e:any){ alert(e.message || 'Checkout failed'); }
  }

  if (loading) return <div className="min-h-screen bg-gray-50 p-6">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-50 p-6 text-red-600">{error}</div>;
  if (!room) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Room {room.number}</div>
          <div className="text-gray-600">{room.type}</div>
        </div>
        <div className="mt-2">Status: <strong>{room.isBooked ? 'Booked' : 'Available'}</strong></div>

        {room.isBooked ? (
          <form onSubmit={onUpdate} className="mt-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="border rounded px-3 py-2" placeholder="Guest Name" value={guestName} onChange={(e)=>setGuestName(e.target.value)} />
              <input className="border rounded px-3 py-2" placeholder="Price" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} />
              <input className="border rounded px-3 py-2" type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
              <input className="border rounded px-3 py-2" type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
              <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Notes" value={notes} onChange={(e)=>setNotes(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <button className="bg-gray-900 text-white rounded px-4 py-2" type="submit">Update</button>
              <button className="bg-gray-700 text-white rounded px-4 py-2" type="button" onClick={onCheckout}>Checkout</button>
              {msg && <div className="text-sm text-gray-500 self-center">{msg}</div>}
            </div>
          </form>
        ) : (
          <div className="mt-6 text-gray-600">This room is available. Booking can be done from the dashboard.</div>
        )}
      </div>
    </div>
  );
};

export default RoomDetail;



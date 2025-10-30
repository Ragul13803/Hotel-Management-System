import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkoutRoom, fetchRooms, updateBookedRoom } from '../lib/rooms-api';

type Props = {
  onChange?: () => void;
};

const RoomsCardView: React.FC<Props> = ({ onChange }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const load = async () => {
    setLoading(true); setError('');
    try {
      const list = await fetchRooms();
      setRooms(list);
    } catch (e: any) { setError(e.message || 'Failed to load rooms'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  async function doUpdate(roomNumber: number){
    const guestName = window.prompt('Guest name (leave empty to keep)') || undefined;
    const fromDate = window.prompt('From date (YYYY-MM-DD)') || undefined;
    const toDate = window.prompt('To date (YYYY-MM-DD)') || undefined;
    const priceStr = window.prompt('Price') || undefined;
    const notes = window.prompt('Notes') || undefined;
    const price = priceStr ? Number(priceStr) : undefined;
    try { await updateBookedRoom(roomNumber, { guestName, fromDate, toDate, price, notes }); await load(); onChange?.(); } catch (e:any){ alert(e.message || 'Update failed'); }
  }

  async function doCheckout(roomNumber: number){
    if (!window.confirm('Confirm checkout?')) return;
    try { await checkoutRoom(roomNumber); await load(); onChange?.(); } catch(e:any){ alert(e.message || 'Checkout failed'); }
  }

  if (loading) return <div className="text-gray-300 animate-pulse">Loading rooms...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!rooms.length) return <div className="text-gray-500">No rooms</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((r:any)=> (
        <div key={r._id} className="bg-white/90 backdrop-blur rounded-xl shadow-xl ring-1 ring-indigo-500/15 p-4 transition transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div className="font-semibold"><Link className="hover:underline" to={`/room/${r.number}`}>Room {r.number}</Link></div>
            <div className="text-sm text-gray-500">{r.type}</div>
          </div>
          <div className="mt-2">Status: <strong className={r.isBooked? 'text-red-600':'text-emerald-600'}>{r.isBooked ? 'Booked' : 'Available'}</strong></div>
          {r.isBooked && (
            <div className="mt-2 text-sm text-gray-600">
              <div>Guest: {r.booking?.guestName || ''}</div>
              <div>From: {r.booking?.fromDate ? new Date(r.booking.fromDate).toLocaleDateString() : ''} To: {r.booking?.toDate ? new Date(r.booking.toDate).toLocaleDateString() : ''}</div>
              {r.booking?.price ? <div>Price: {r.booking.price}</div> : null}
            </div>
          )}
          <div className="mt-3 flex gap-2">
            {r.isBooked ? (
              <>
                <button onClick={()=>doUpdate(r.number)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded px-3 py-1 transition">Update</button>
                <button onClick={()=>doCheckout(r.number)} className="bg-rose-600 hover:bg-rose-700 text-white rounded px-3 py-1 transition">Checkout</button>
              </>
            ) : (
              <button disabled className="bg-emerald-500/20 text-emerald-700 rounded px-3 py-1 cursor-not-allowed">Available</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomsCardView;



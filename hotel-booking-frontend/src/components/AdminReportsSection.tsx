import { useEffect, useState } from "react";
import { DollarSign, Users, Calendar, BarChart } from "lucide-react";

interface Room {
  id: number;
  number: number;
  isBooked: boolean;
  booking?: {
    guestName?: string;
    fromDate?: string;
    toDate?: string;
    price?: number;
  };
}

interface SummaryData {
  hotel: {
    name: string;
    totalRooms: number;
  };
  summary: {
    total: number;
    available: number;
    booked: number;
  };
  rooms: Room[];
}

const AdminReportsSection = () => {
  const [data, setData] = useState<SummaryData | null>(null);

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/rooms/summary");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <p className="text-gray-400">Loading reports...</p>;

  // --- 🧮 Derived Reports ---
  const totalRooms = data.summary.total;
  const bookedRooms = data.summary.booked;
  const availableRooms = data.summary.available;

  const occupancyRate = ((bookedRooms / totalRooms) * 100).toFixed(1);

  const totalRevenue = data.rooms
    .filter((r) => r.isBooked && r.booking?.price)
    .reduce((sum, r) => sum + (r.booking?.price || 0), 0);

  const avgRoomPrice =
    bookedRooms > 0 ? (totalRevenue / bookedRooms).toFixed(2) : "0.00";

  const today = new Date();

  const currentGuests = data.rooms.filter((r) => {
    if (!r.isBooked || !r.booking?.fromDate || !r.booking?.toDate) return false;
    const from = new Date(r.booking.fromDate);
    const to = new Date(r.booking.toDate);
    return from <= today && to >= today;
  });

  const upcomingCheckouts = data.rooms.filter((r) => {
    if (!r.isBooked || !r.booking?.toDate) return false;
    const to = new Date(r.booking.toDate);
    const diffDays = (to.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 3; // next 3 days
  });

  // --- 💎 UI Section ---
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Revenue */}
      <div className="p-6 bg-white/10 rounded-2xl backdrop-blur shadow-xl ring-1 ring-green-400/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Total Revenue</h3>
          <DollarSign className="text-green-400" />
        </div>
        <p className="text-3xl font-bold text-green-300">₹{totalRevenue}</p>
        <p className="text-gray-400 text-sm mt-1">Overall booking income</p>
      </div>

      {/* Occupancy */}
      <div className="p-6 bg-white/10 rounded-2xl backdrop-blur shadow-xl ring-1 ring-blue-400/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Occupancy Rate</h3>
          <BarChart className="text-blue-400" />
        </div>
        <p className="text-3xl font-bold text-blue-300">{occupancyRate}%</p>
        <p className="text-gray-400 text-sm mt-1">
          {bookedRooms} of {totalRooms} rooms booked
        </p>
      </div>

      {/* Average Price */}
      <div className="p-6 bg-white/10 rounded-2xl backdrop-blur shadow-xl ring-1 ring-purple-400/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Avg. Room Price</h3>
          <DollarSign className="text-purple-400" />
        </div>
        <p className="text-3xl font-bold text-purple-300">₹{avgRoomPrice}</p>
        <p className="text-gray-400 text-sm mt-1">Per booked room</p>
      </div>

      {/* Guests Staying */}
      <div className="p-6 bg-white/10 rounded-2xl backdrop-blur shadow-xl ring-1 ring-yellow-400/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Current Guests</h3>
          <Users className="text-yellow-400" />
        </div>
        <p className="text-3xl font-bold text-yellow-300">
          {currentGuests.length}
        </p>
        <p className="text-gray-400 text-sm mt-1">Staying today</p>
      </div>

      {/* Upcoming Checkouts */}
      <div className="md:col-span-2 lg:col-span-4 p-6 bg-white/10 rounded-2xl backdrop-blur shadow-xl ring-1 ring-indigo-400/20 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Upcoming Check-outs</h3>
          <Calendar className="text-indigo-400" />
        </div>
        {upcomingCheckouts.length > 0 ? (
          <table className="w-full text-left text-gray-300 text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-2">Guest</th>
                <th className="pb-2">Room</th>
                <th className="pb-2">Checkout Date</th>
              </tr>
            </thead>
            <tbody>
              {upcomingCheckouts.map((r, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-2">{r.booking?.guestName || "N/A"}</td>
                  <td className="py-2">Room {r.number}</td>
                  <td className="py-2">
                    {new Date(r.booking?.toDate || "").toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">No upcoming check-outs in the next 3 days.</p>
        )}
      </div>
    </div>
  );
};

export default AdminReportsSection;

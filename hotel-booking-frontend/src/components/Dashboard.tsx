import { useEffect, useState } from "react";
import {
  BedDouble,
  CheckCircle2,
  XCircle,
  BarChart,
  PlusCircle,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import BookRoomForm from "./BookRoomForm"; // ✅ Import your existing form
import {
  fetchRoomsSummary,
  bookSpecificRoom,
  updateBookedRoom,
  checkoutRoom,
  RoomsSummary,
} from "../lib/rooms-api";

type Room = RoomsSummary["rooms"][number];
type SummaryData = RoomsSummary;

const Dashboard = () => {
  const [data, setData] = useState<SummaryData | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [mode, setMode] = useState<"book" | "update">("book");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const fetchData = async () => {
    const json = await fetchRoomsSummary();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleBookOrUpdate = async (formData: any) => {
    try {
      // Determine target room id: prefer selected row; fallback to form's roomId
      const targetRoomId: number | string | undefined =
        selectedRoom?.id ?? formData?.roomId;

      if (!targetRoomId) throw new Error("No room selected");

      if (mode === "update") {
        await updateBookedRoom(targetRoomId, formData);
      } else {
        await bookSpecificRoom(targetRoomId, formData);
      }

      showToast(
        `Room ${(selectedRoom?.number ?? targetRoomId)} ${
          mode === "update" ? "updated" : "booked"
        } successfully!`,
        "success"
      );
      setOpen(false);
      fetchData();
    } catch (e: any) {
      showToast(e?.message || "Action failed. Please try again.", "error");
    }
  };

  const handleCheckout = async (roomId: number) => {
    try {
      await checkoutRoom(roomId);

      showToast(`Room ${roomId} checked out successfully!`, "success");
      fetchData();
    } catch {
      showToast("Checkout failed.", "error");
    }
  };

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-gray-300 text-lg">
        Loading Dashboard...
      </div>
    );

  const { total, available, booked } = data.summary;
  const occupancyRate = ((booked / total) * 100).toFixed(1);
  const totalRevenue = data.rooms
    .filter((r) => r.isBooked && r.booking?.price)
    .reduce((sum, r) => sum + (r.booking?.price || 0), 0);

  const avgRoomPrice =
    booked > 0 ? (totalRevenue / booked).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 relative overflow-hidden">
      {/* Background */}
      <img
        src="/Boatel%20Front%20View.jpeg"
        alt="Hotel background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-fuchsia-500/10 to-transparent z-0"></div>

      {/* Toast message */}
      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white z-50 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Admin Dashboard
          </h1>
          <Button
            onClick={() => {
              setMode("book");
              setSelectedRoom(null);
              setOpen(true);
            }}
            className="bg-primary-500 hover:bg-primary-700 text-white flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Book Room
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Rooms" value={total} icon={BedDouble} color="text-blue-400" />
          <StatCard title="Available" value={available} icon={CheckCircle2} color="text-green-400" />
          <StatCard title="Booked" value={booked} icon={XCircle} color="text-red-400" />
          <StatCard title="Occupancy" value={`${occupancyRate}%`} icon={BarChart} color="text-yellow-400" />
        </div>

        {/* Reports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <ReportCard title="Total Revenue" value={`₹${totalRevenue}`} icon={DollarSign} color="text-green-400" />
          <ReportCard title="Avg Room Price" value={`₹${avgRoomPrice}`} icon={DollarSign} color="text-purple-400" />
          <ReportCard title="Upcoming Checkouts" value="2" icon={Calendar} color="text-indigo-400" />
        </div>

        {/* Room Details Table */}
        <div className="p-6 bg-white/10 rounded-2xl backdrop-blur shadow-xl ring-1 ring-indigo-400/20">
          <h2 className="text-xl font-semibold text-white mb-4">
            Room Details
          </h2>
          <table className="w-full text-left text-gray-300 text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-2">Room</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Guest</th>
                <th className="pb-2">Check-in</th>
                <th className="pb-2">Check-out</th>
                <th className="pb-2">Price</th>
                <th className="pb-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.rooms.map((room) => (
                <tr
                  key={room.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-2">Room {room.number}</td>
                  <td className="py-2">
                    {room.isBooked ? (
                      <span className="text-red-400">Booked</span>
                    ) : (
                      <span className="text-green-400">Available</span>
                    )}
                  </td>
                  <td className="py-2">{room.booking?.guestName || "-"}</td>
                  <td className="py-2">
                    {room.booking?.fromDate
                      ? new Date(room.booking.fromDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-2">
                    {room.booking?.toDate
                      ? new Date(room.booking.toDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-2">₹{room.booking?.price || "-"}</td>
                  <td className="py-2 text-right">
                    {room.isBooked ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedRoom(room);
                            setMode("update");
                            setOpen(true);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleCheckout(room.id)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          Checkout
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedRoom(room);
                          setMode("book");
                          setOpen(true);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Book
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Dialog */}
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-xl p-2">
          {/* <DialogHeader>
            <DialogTitle>
              {mode === "update"
                ? `Update Room ${selectedRoom?.number}`
                : `Book Room ${selectedRoom?.number || ""}`}
            </DialogTitle>
          </DialogHeader> */}
          <BookRoomForm
            existingData={selectedRoom ? { ...selectedRoom.booking, roomId: selectedRoom.id } : undefined}
            mode={mode}
            onSubmit={handleBookOrUpdate}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Reusable small stat cards
const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="p-6 bg-white/10 rounded-2xl backdrop-blur shadow-xl ring-1 ring-white/10">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <Icon className={color} />
    </div>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

const ReportCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="p-6 bg-white/10 rounded-2xl backdrop-blur shadow-xl ring-1 ring-white/10">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <Icon className={color} />
    </div>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default Dashboard;

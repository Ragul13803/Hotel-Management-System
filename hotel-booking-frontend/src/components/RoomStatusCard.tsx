import React, { useEffect, useState } from 'react';

interface RoomStatusCardProps {
  title: string;
  icon: React.ElementType;
  color: string;
  field: 'total' | 'available' | 'booked';
}

const RoomStatusCard: React.FC<RoomStatusCardProps> = ({
  title, icon: Icon, color, field
}) => {

  const [roomsdata, setRoomsData] = useState({});
  console.log(roomsdata);

  const fetchRoomStatus = async () => {
    const response = await fetch('http://localhost:3000/api/rooms/summary');
    const data = await response.json();
    setRoomsData(data);
  };

  useEffect(() => {
    fetchRoomStatus();
  }, []);

  return (
    <div className={`bg-white/90 backdrop-blur rounded-2xl shadow-xl ring-1 ring-indigo-500/15 p-6 flex items-center transition transform hover:-translate-y-0.5`}>
      <div className={`p-3 rounded-full ${color} bg-opacity-15 bg-gradient-to-br from-white/40 to-transparent` }>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="text-3xl font-extrabold text-slate-900">
          {typeof (roomsdata as any)?.summary?.[field] === "number"
            ? (roomsdata as any).summary[field]
            : '--'}
        </p>
      </div>
    </div>
  );
};

export default RoomStatusCard;

import { locations } from "@/constants/locations";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UserCardProps {
  user: User;
  onDetail: () => void;
}

export default function UserCard({ user, onDetail }: UserCardProps) {
    const lokasi = locations[user.id % locations.length];

  return (
    <div
      className="
        relative bg-white/80 backdrop-blur-md
        rounded-3xl p-6
        shadow-lg hover:shadow-xl
        transition
        flex flex-col items-center text-center
      "
    >
      {/* AVATAR */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow -mt-14 bg-white">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* NAMA */}
      <h3 className="mt-4 font-bold text-lg text-gray-800">
        {user.first_name} {user.last_name}
      </h3>

      {/* LOKASI (DUMMY DATA) */}
      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
        📍 {lokasi}
      </p>

      {/* TOMBOL DETAIL */}
      <button
        onClick={onDetail}
        className="
          mt-6 w-full
          bg-gray-900 text-white
          py-2 rounded-full
          hover:bg-gray-800 transition
        "
      >
        Detail
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { locations } from "@/constants/locations";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export default function UserDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "pro_f8e12047372c3bdf414fe83a2eda7c7ecf0f924a9d3cc156",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    if (!authorized || !id) return;

    const getUserDetail = async () => {
      try {
        const response = await fetch(`https://reqres.in/api/users/${id}`, {
          method: "GET",
          headers,
        });

        const data = await response.json();
        setUser(data.data);
      } finally {
        setLoading(false);
      }
    };

    getUserDetail();
  }, [authorized, id]);

  if (!authorized || loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-900 to-blue-700 p-6 md:p-10">
        {/* TOMBOL KEMBALI (SKELETON) */}
        <div className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white/40 text-sm">
          ← Back to Users
        </div>

        {/* SKELETON CARD */}
        <div className="max-w-md mx-auto bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-8 text-center relative animate-pulse">
          {/* AVATAR */}
          <div className="w-28 h-28 mx-auto rounded-full bg-white/40 -mt-20 mb-6" />

          {/* NAMA */}
          <div className="h-5 w-40 bg-white/40 rounded mx-auto mb-3" />

          {/* EMAIL */}
          <div className="h-4 w-56 bg-white/30 rounded mx-auto mb-3" />

          {/* LOKASI */}
          <div className="h-4 w-32 bg-white/30 rounded mx-auto mb-6" />

          {/* TOMBOL */}
          <div className="h-10 w-full bg-white/40 rounded-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-900 to-blue-700 flex flex-col items-center justify-center p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">User not found</h1>
        <p className="text-white/70 mb-8 text-sm">
          The user you are looking for does not exist.
        </p>

        <button
          onClick={() => router.push("/users")}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition"
        >
          ← Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 to-blue-700 p-6 md:p-10">
      {/* TOMBOL KEMBALI*/}
      <button
        onClick={() => router.push("/users")}
        className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm hover:bg-white/30 transition"
      >
        ← Back to Users
      </button>

      {/* DETAIL CARD */}
      <div
        className="
        max-w-md mx-auto
        bg-white/80 backdrop-blur-md
        rounded-3xl
        shadow-xl
        p-8
        text-center
        relative
      "
      >
        {/* AVATAR */}
        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow -mt-20 bg-white">
          <img
            src={user.avatar}
            alt={user.first_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* NAMA */}
        <h1 className="mt-6 text-2xl font-bold text-gray-800">
          {user.first_name} {user.last_name}
        </h1>

        {/* EMAIL */}
        <p className="text-gray-500 mt-2">{user.email}</p>

        {/* LOKASI (DUMMY DATA) */}
        <p className="mt-3 text-sm text-gray-500 flex justify-center items-center gap-1">
          📍 {locations[user.id % locations.length]}
        </p>

        {/* TOMBOL TAMBAHAN */}
        <div className="mt-8">
          <button
            className="
            w-full
            bg-gray-900 text-white
            py-2 rounded-full
            hover:bg-gray-800
            transition
          "
          >
            Contact User
          </button>
        </div>
      </div>
    </div>
  );
}

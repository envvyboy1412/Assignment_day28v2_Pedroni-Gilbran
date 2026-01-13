import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserCard from "@/components/UserCard";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export default function UsersPage() {
  const router = useRouter();
  const isFirstLoad = useRef(true);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
  if (!authorized) return;

  if (isFirstLoad.current) {
    // delay hanya sekali
    const timer = setTimeout(() => {
      getUsers();
      isFirstLoad.current = false;
    }, 3000);

    return () => clearTimeout(timer);
  }

  // page change → langsung fetch
  getUsers();
}, [authorized, page]);

  // useEffect(() => {
  //   getUsers()
  // },[page])

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
        headers,
      });
      const data = await res.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout berhasil");

    setTimeout(() => {
      router.replace("/login");
    }, 1500);
  };

if (!authorized || loading) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 to-blue-700 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-16 text-white">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-white/70">Loading users data...</p>
        </div>

        {/* SKELETON TOMBOL LOGOUT */}
        <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white/60">
          Logout
        </div>
      </div>

      {/* SKELETON GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white/30 backdrop-blur-md rounded-3xl p-6 shadow animate-pulse flex flex-col items-center"
          >
            {/* AVATAR */}
            <div className="w-24 h-24 rounded-full bg-white/40 -mt-14 mb-6" />

            {/* NAMA */}
            <div className="h-4 w-32 bg-white/40 rounded mb-3" />

            {/* LOKASI */}
            <div className="h-3 w-24 bg-white/30 rounded mb-6" />

            {/* TOMBOL */}
            <div className="h-9 w-full bg-white/40 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 to-blue-700 p-8">
      <ToastContainer theme="dark" />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-16 text-white">
        <h1 className="text-2xl font-bold">Users List</h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-medium hover:bg-white/30 transition"
        >
          <span className="text-lg">⎋</span>
          Logout
        </button>
      </div>

      {/* USERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDetail={() => {
              router.push(`/users/${user.id}`);
            }}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-6 mt-20 text-white">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-lg bg-white/20 disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page <b>{page}</b> of <b>{totalPages}</b>
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-lg bg-white/20 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

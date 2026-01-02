import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export default function UsersPage() {
  const router = useRouter();

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
    if (authorized) {
      getUsers();
    }
  }, [authorized, page]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://reqres.in/api/users?page=${page}`,
        { headers }
      );
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
    return <div className="p-10">Loading users...</div>;
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <ToastContainer theme="dark" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users List</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => router.push(`/users/${user.id}`)}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow cursor-pointer hover:bg-gray-50"
          >
            <img
              src={user.avatar}
              className="w-14 h-14 rounded-full"
              alt={user.first_name}
            />

            <div>
              <div className="font-semibold">
                {user.first_name} {user.last_name}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded bg-white disabled:opacity-50"
        >
          Prev
        </button>

        <div>
          Page {page} of {totalPages}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded bg-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

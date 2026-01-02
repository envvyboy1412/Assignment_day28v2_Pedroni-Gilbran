import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
        const response = await fetch(
          `https://reqres.in/api/users/${id}`,
          {
            method: "GET",
            headers,
          }
        );

        const data = await response.json();
        setUser(data.data);
      } finally {
        setLoading(false);
      }
    };

    getUserDetail();
  }, [authorized, id]);

  if (!authorized || loading) {
    return <div className="p-10">Loading user...</div>;
  }

  if (!user) {
    return <div className="p-10">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Back to Users
      </button>

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm p-6 flex items-center gap-6">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="w-24 h-24 rounded-full object-cover"
        />

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

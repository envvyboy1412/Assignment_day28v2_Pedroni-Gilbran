import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submitRegister = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "pro_f8e12047372c3bdf414fe83a2eda7c7ecf0f924a9d3cc156",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        toast.success("Berhasil Register");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(data.error || "Gagal Register");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-500 via-blue-500 to-cyan-400 flex items-center justify-center px-4">
      <ToastContainer theme="dark" />

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* SISI KIRI - FORM */}
        <div className="p-8 md:p-12">
          <h1 className="text-2xl font-extrabold text-center mb-2">
            Create Account
          </h1>

          <p className="text-center text-gray-500 text-sm mb-8">
            Use your email for registration
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 group cursor-pointer">
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🫣" : "🤔"}
                </span>

                <div className="absolute -top-8 right-1/2 translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                  {showPassword ? "Hide password" : "Show password"}
                </div>
              </div>
            </div>
          </div>

          {/* TOMBOL REGISTER */}
          <button
            onClick={submitRegister}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-md font-semibold transition"
          >
            {loading ? "Loading..." : "SIGN UP"}
          </button>

          {/* HANYA TAMPIL DI MOBILE */}
          <p className="text-center text-sm mt-6 md:hidden">
            Already have an account?
            <Link
              href="/login"
              className="ml-1 font-semibold text-blue-500 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* SISI KANAN - TEKS DAN TOMBOL*/}
        <div className=" md:flex flex-col items-center justify-center bg-linear-to-br from-blue-500 to-indigo-500 text-white p-10">
          <h2 className="text-3xl text-center font-extrabold mb-4">Hello, Friend!</h2>

          <p className="text-center mb-6 text-sm opacity-90">
            Enter your personal details and start your journey with us
          </p>

          <a
            href="/login"
            className="hidden md:inline-block border border-white px-8 py-2 rounded-full hover:bg-white hover:text-blue-500 transition"
          >
            SIGN IN
          </a>
        </div>
      </div>
    </div>
  );
}

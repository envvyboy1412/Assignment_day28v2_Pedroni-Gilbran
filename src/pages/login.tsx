import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submitLogin = async () => {
    setLoading(true);

    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "pro_f8e12047372c3bdf414fe83a2eda7c7ecf0f924a9d3cc156",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      toast.success("Login berhasil");

      setTimeout(() => {
        router.push("/users");
      }, 2000);
    } else {
      toast.error(data.error || "Login gagal");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-500 via-blue-500 to-cyan-400 flex items-center justify-center px-4">
      <ToastContainer theme="dark" />

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* SISI KIRI - TEKS DAN TOMBOL*/}
        <div className=" md:flex flex-col items-center justify-center bg-linear-to-br from-blue-500 to-indigo-500 text-white p-10">
          <h2 className="text-3xl text-center font-extrabold mb-4">Welcome Back!</h2>

          <p className="text-center font mb-6 text-sm opacity-90">
            To keep connected with us please login with your personal info
          </p>

          <a
            href="/register"
            className="hidden md:inline-block border  border-white px-8 py-2 rounded-full hover:bg-white hover:text-blue-500 transition"
          >
            SIGN UP
          </a>
        </div>

        {/* SISI KANAN - FORM */}
        <div className="p-8 md:p-12 ">
          <h1 className="text-2xl font-extrabold text-center mb-2">Sign in</h1>

          <p className="text-center text-gray-500 text-sm mb-8">
            Please enter your details to sign in
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
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

          {/* BUTTON LOGIN */}
          <button
            onClick={submitLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-md font-semibold transition"
          >
            {loading ? "Loading..." : "SIGN IN"}
          </button>

          {/* HANYA TAMPIL DI MOBILE*/}
          <p className="text-center text-sm mt-6 md:hidden">
            Don't have an account?
            <Link
              href="/register"
              className="ml-1 font-semibold text-blue-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

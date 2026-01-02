import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRegister = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center">
        <ToastContainer theme="light" />

        <div className="border p-6 rounded-2xl w-90 bg-white">
          <p className="font-extrabold text-center text-xl py-4">
            Create An Account
          </p>

          <p className="text-center pb-4 text-gray-500">
            Start your 30-day free trial. No credit card required
          </p>

          <div className="my-4">
            <p className="font-bold py-2">Email Address</p>
            <input
              placeholder="name@company.com"
              className="border w-full mb-3 px-3 py-2 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-4">
            <p className="font-bold py-2">Password</p>
            <input
              type="password"
              placeholder="Create a password"
              className="border w-full mb-4 px-3 py-2 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={submitRegister}
            disabled={loading}
            className="cursor-pointer bg-black text-white w-full py-2 rounded"
          >
            {loading ? "Loading..." : "Create Account"}
          </button>

          <div className="text-center text-sm mt-4">
            Already have an account?
            <span
              onClick={() => router.push("/login")}
              className="ml-1 font-semibold cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

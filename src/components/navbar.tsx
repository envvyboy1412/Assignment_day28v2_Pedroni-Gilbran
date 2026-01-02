import Link from "next/link";

export default function Navbar() {
  return (
    <header
      id="main-header"
      className="flex flex-row gap-4 p-4 justify-between border-b-2"
    >
      <div>Mini Project</div>

      <div>
        Already have an account?
        <Link href="/login" className="ml-1 font-bold text-black hover:underline">
          Log In
        </Link>
      </div>
    </header>
  );
}

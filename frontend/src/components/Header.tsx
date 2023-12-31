import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Bookify</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="flex items-center text-blue-600 px-3 font-bold bg-white hover:bg-gray-300 rounded"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
}

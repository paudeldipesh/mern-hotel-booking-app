import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export default function Header() {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Bookify</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="text-white font-semibold">
                My Bookings
              </Link>
              <Link to="/my-hotels" className="text-white font-semibold">
                My Hotels
              </Link>
              <button className="flex items-center text-blue-600 bg-white px-3 rounded-md font-bold hover:bg-gray-100">
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-blue-600 bg-white px-3 rounded-md font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

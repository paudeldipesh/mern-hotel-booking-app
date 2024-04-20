import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../contexts/SearchContext";
import "react-datepicker/dist/react-datepicker.css";

export default function Searchbar() {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const today = new Date();
  const minDate = today;
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleClear = () => {
    setDestination("");
    setCheckIn(today);
    setCheckOut(today);
    setAdultCount(1);
    setChildCount(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center rounded flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="flex rounded bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:{" "}
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(Number.parseInt(e.target.value))}
          />
        </label>

        <label className="items-center flex">
          Children:{" "}
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(Number.parseInt(e.target.value))}
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full rounded bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkOut}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full rounded bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-4">
        <button className="bg-green-600 text-white h-full py-2 px-4 text-xl rounded font-bold hover:bg-green-500">
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-red-600 text-white h-full py-2 px-4 text-xl rounded font-bold hover:bg-red-500"
        >
          Clear
        </button>
      </div>
    </form>
  );
}

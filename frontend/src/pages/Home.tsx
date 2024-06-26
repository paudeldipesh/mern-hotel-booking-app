import { useQuery } from "react-query";
import { HotelDestinationCard } from "../components";
import * as apiClient from "../apiClient";

export default function Home() {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );
  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>

      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <HotelDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>

        <hr className="border-t-2 border-blue-500 py-2" />

        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <HotelDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}

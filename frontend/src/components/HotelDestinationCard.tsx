import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type HotelDestinationCardProps = {
  hotel: HotelType;
};

export default function HotelDestinationCard({
  hotel,
}: HotelDestinationCardProps) {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md text-white font-bold text-lg">
        {hotel.name}
      </div>
    </Link>
  );
}

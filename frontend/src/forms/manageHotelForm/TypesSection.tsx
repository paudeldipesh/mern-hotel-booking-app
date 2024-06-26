import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotelOptionsConfig";
import { HotelFormData } from "./ManageHotelForm";

export default function TypesSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch === type
                ? "flex justify-center items-center bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold cursor-pointer"
                : "flex justify-center items-center bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold cursor-pointer"
            }
          >
            <input
              type="radio"
              className="hidden"
              value={type}
              {...register("type", { required: "This field is required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}

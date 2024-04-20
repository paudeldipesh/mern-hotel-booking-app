import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypesSection from "./TypesSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

interface ManageHotelFormProps {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
}

export default function ManageHotelForm({
  hotel,
  onSave,
  isLoading,
}: ManageHotelFormProps) {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [reset, hotel]);

  const onSubmit = handleSubmit((formDataJSON: HotelFormData) => {
    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }

    formData.append("name", formDataJSON.name);
    formData.append("city", formDataJSON.city);
    formData.append("country", formDataJSON.country);
    formData.append("description", formDataJSON.description);
    formData.append("type", formDataJSON.type);
    formData.append("pricePerNight", formDataJSON.pricePerNight.toString());
    formData.append("starRating", formDataJSON.starRating.toString());
    formData.append("adultCount", formDataJSON.adultCount.toString());
    formData.append("childCount", formDataJSON.childCount.toString());

    formDataJSON.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJSON.imageUrls) {
      formDataJSON.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJSON.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypesSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-500 text-white py-2 px-3 rounded font-bold hover:bg-blue-500 text-xl"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

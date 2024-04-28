import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';

  return (
    <div className="mt-4-mx-8  pt-8">
     <div className="flex justify-between mb-4">
     <h1 className="text-3xl font-bold border-b-2 border-dotted border-black">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
     </div>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="">
          <div className="mt-2 mb-4">
            <h2 className="font-semibold pb-2 text-2xl border-b border-gray-600 ">Description</h2>
            <div className="text-xl mt-2 text-gray-700 ">{place.description}</div>
          </div>
          <div className="flex gap-8 text-md text-black font-bold">
            <div className="border-2 border-pink-400 rounded-2xl p-6 cursor-pointer">Check-in: {place.checkIn}</div>
            <div className="border-2 border-pink-400 rounded-2xl p-6 cursor-pointer">Check-out: {place.checkOut}</div>
            <div className="border-2 border-pink-400 rounded-2xl p-6 cursor-pointer">Max number of guests: {place.maxGuests}</div>
          </div>
        </div>

        <div>
          <BookingWidget place={place} />
        </div>
      </div>

      <div className="bg-white  px-8 pt-8 bg-gradient-to-br from-pink-200 to-orange-300 ">
        <div className="">
          <h2 className="font-semibold text-3xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-lg text-gray-700 leading-8 border-b border-gray-400 pb-4">{place.extraInfo}</div>
      </div>


    </div>
  );
}
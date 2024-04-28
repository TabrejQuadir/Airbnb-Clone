import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {

    if (!user) {
      setRedirect("/login");
      return;
    }

    try {
      const response = await axios.post('/bookings', {
        checkIn, checkOut, numberOfGuests, name, phone,
        place: place._id,
        price: numberOfNights * place.price,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error Booking this Place:", error);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }


  return (
    <div className="bg-white shadow-lg shadow-pink-600 p-4 rounded-2xl ">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border border-gray-500 rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4 border-r border-b border-gray-500 ">
            <label>Check in:</label>
            <input type="date"
              value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)} />
          </div>



          <div className="py-3 px-4 border-b border-gray-500 ">
            <label>Check out:</label>
            <input type="date" value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)} />
          </div>
        </div>

        <div className="py-3 px-4 ">
          <label>Number of guests:</label>
          <input type="number"
            value={numberOfGuests}
            onChange={ev => setNumberOfGuests(ev.target.value)} />
        </div>


        {numberOfNights > 0 && (
          <div className="py-3 px-4 ">
            <label>Your full name:</label>
            <input type="text"
              value={name}
              onChange={ev => setName(ev.target.value)} />
            <label>Phone number:</label>
            <input type="tel"
              value={phone}
              onChange={ev => setPhone(ev.target.value)} />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && (
          <span> ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}
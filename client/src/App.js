import { Routes, Route } from "react-router-dom";
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './Pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './Pages/ProfilePage';
import Placespage from './Pages/Placespage';
import PlacesForm from './Pages/PlacesForm';
import PlacePage from './Pages/PlacePage';
import BookingPage from './Pages/BookingPage';
import BookingsPage from './Pages/BookingsPage';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials=true;

function App() {
  return (

    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<Placespage />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;




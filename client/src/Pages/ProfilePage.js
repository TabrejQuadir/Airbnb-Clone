import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Placespage from './Placespage';
import AccountNav from '../AccountNav';

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  async function logout() {
    await axios.post("/logout");
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return "Loading..."
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          <span className='text-black font-bold text-xl'> Logged in as</span>
          <p className='text-violet-600 font-extrabold text-2xl'> {user.name}</p>
           <p className='text-violet-600 font-extrabold text-2xl'>  {user.email}</p>
          <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <Placespage />
      )}
    </div>
  )
}

export default ProfilePage;
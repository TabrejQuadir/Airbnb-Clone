import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'


const Layout = () => {

  const location = useLocation();

  const isRegistrationOrLoginPage = location.pathname === '/register' || location.pathname === '/login';

  return (
    <div className='p-4 flex flex-col min-h-screen pl-20 pr-20 bg-gradient-to-br from-pink-200 to-yellow-300'>
        <Header/>
        <Outlet/>
        {!isRegistrationOrLoginPage && <Footer />}
    </div>
  )
}

export default Layout;
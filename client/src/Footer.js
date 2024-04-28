import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-pink-200 to-yellow-300 text-gray-800 mt-4">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-wrap justify-between">
        <div className="w-full sm:w-1/2 md:w-auto">
          <h4 className="text-lg font-semibold mb-4">About</h4>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Policies</li>
            <li>Help</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-auto">
          <h4 className="text-lg font-semibold mb-4">Discover</h4>
          <ul className="space-y-2">
            <li>Trust & Safety</li>
            <li>Travel Credit</li>
            <li>Gift Cards</li>
            <li>Airbnb Citizen</li>
            <li>Business Travel</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-auto">
          <h4 className="text-lg font-semibold mb-4">Hosting</h4>
          <ul className="space-y-2">
            <li>Why Host</li>
            <li>Hospitality</li>
            <li>Responsible Hosting</li>
            <li>Community Center</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-auto">
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>Our COVID-19 Response</li>
            <li>Help Center</li>
            <li>Cancellation Options</li>
            <li>Neighborhood Support</li>
            <li>Accessibility</li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-sm text-gray-200">&copy; 2024 Airbnb, Inc. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

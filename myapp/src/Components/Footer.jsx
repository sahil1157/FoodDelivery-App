import React from 'react';
import { Link } from 'react-router-dom';
import androidImg from '../images/get.png';
import iosImg from '../images/App-Store-Symbol.png';

const Footer = () => {
  
  return (
    <footer className="bg-orange-500 flex w-full h-fit mt-6 text-white py-10">
      <div className=" px-[5%] container mx-auto">
        <div className="grid grid-cols-2 md:flex md:flex-row gap-8 lg:justify-evenly ">
          <div className="w-full md:w-fit mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Our Company</h2>
            <ul className="flex flex-col space-y-2">
              <li><Link className="hover:underline">About Us</Link></li>
              <li><Link className="hover:underline">Career</Link></li>
              <li><Link className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-fit mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <ul className="flex flex-col space-y-2">
              <li><Link className="hover:underline">Help & Support</Link></li>
              <li><Link className="hover:underline">Become Our Partner</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-fit mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Legal</h2>
            <ul className="flex flex-col space-y-2">
              <li><Link className="hover:underline">Terms and Conditions</Link></li>
              <li><Link className="hover:underline">Privacy and Policy</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-fit mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Nepal's Favourite Foodie App</h2>
            <div className="flex w-full flex-col space-y-2">
              <img src={androidImg} alt="Download on Android" className="w-32 bg-none rounded-lg h-10 bg-transparent" />
              <img src={iosImg} alt="Download on iOS" className="w-32" />
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-200 text-sm">
          &copy; 2023 Gofood. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

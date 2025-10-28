import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 text-sm py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <a href="#" className="hover:text-purple-600">About</a>
          <a href="#" className="hover:text-purple-600">Privacy Policy</a>
          <a href="#" className="hover:text-purple-600">Terms of Service</a>
          <a href="#" className="hover:text-purple-600">Contact</a>
        </div>
        <p>&copy; {new Date().getFullYear()} MindMile. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

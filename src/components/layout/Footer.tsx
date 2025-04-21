import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">TeamMatch</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Find your perfect hackathon teammates and build something amazing together.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/hackathons" className="text-base text-gray-600 hover:text-gray-800">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link to="/teammates" className="text-base text-gray-600 hover:text-gray-800">
                  Find Teammates
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-base text-gray-600 hover:text-gray-800">
                  Your Dashboard
                </Link>
              </li>
              <li>
                <Link to="/messages" className="text-base text-gray-600 hover:text-gray-800">
                  Messages
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/help" className="text-base text-gray-600 hover:text-gray-800">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-base text-gray-600 hover:text-gray-800">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-600 hover:text-gray-800">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-600 hover:text-gray-800">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-600 hover:text-gray-800">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-600 hover:text-gray-800">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-base text-gray-600 hover:text-gray-800">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-600 hover:text-gray-800">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-500">
            &copy; {new Date().getFullYear()} TeamMatch. All rights reserved.
          </p>
          <p className="mt-4 md:mt-0 text-base text-gray-500 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-pink-500" /> for hackathon teams everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
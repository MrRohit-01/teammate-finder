import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { Menu, X, Bell, UserCircle, LogOut, Search } from 'lucide-react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, isAuthenticated, logout, notifications } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  
  const unreadNotifications = notifications.filter(
    n => n.userId === currentUser?.id && !n.read
  ).length;
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const navLinks = [
    { name: 'Home', path: '/', public: true },
    { name: 'Hackathons', path: '/hackathons', public: true },
    { name: 'Find Teammates', path: '/teammates', public: true },
    { name: 'Messages', path: '/messages', public: false },
    { name: 'Dashboard', path: '/dashboard', public: false },
  ];
  
  const visibleLinks = navLinks.filter(link => 
    link.public || isAuthenticated
  );
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
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
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {visibleLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === link.path
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link 
              to="/search" 
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Search</span>
              <Search className="h-6 w-6" />
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/notifications" 
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
                >
                  <span className="sr-only">Notifications</span>
                  <Bell className="h-6 w-6" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
                </Link>
                
                <div className="relative">
                  <Link to="/profile">
                    <Avatar 
                      src={currentUser?.photoURL} 
                      name={currentUser?.displayName} 
                      size="sm" 
                    />
                  </Link>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Avatar 
                      src={currentUser?.photoURL} 
                      name={currentUser?.displayName}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {currentUser?.displayName}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {currentUser?.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <UserCircle className="mr-2 h-5 w-5" />
                      Your Profile
                    </span>
                  </Link>
                  <Link
                    to="/notifications"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <Bell className="mr-2 h-5 w-5" />
                      Notifications
                      {unreadNotifications > 0 && (
                        <span className="ml-auto bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {unreadNotifications}
                        </span>
                      )}
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <span className="flex items-center">
                      <LogOut className="mr-2 h-5 w-5" />
                      Sign out
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-2 space-y-2">
                <Link
                  to="/login"
                  className="block text-center w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 border rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block text-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { Users, Search, Calendar, MessageSquare } from 'lucide-react';
import Button from '../components/common/Button';
import HackathonCard from '../components/hackathon/HackathonCard';
import UserProfileCard from '../components/profile/UserProfileCard';

const HomePage: React.FC = () => {
  const { isAuthenticated, users, hackathons } = useAppStore();
  
  // Get featured hackathons (upcoming ones)
  const featuredHackathons = hackathons
    .filter(h => new Date(h.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);
  
  // Get featured users
  const featuredUsers = users.slice(0, 4);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Find Your Perfect Hackathon Team
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Connect with talented developers, designers, and collaborators who share your vision and complement your skills.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/hackathons">
                <Button 
                  size="lg" 
                  variant="secondary"
                  icon={<Calendar size={20} />}
                >
                  Browse Hackathons
                </Button>
              </Link>
              <Link to="/teammates">
                <Button 
                  size="lg" 
                  variant="primary"
                  className="text-black bg-white hover:bg-gray-100 hover:text-white"
                  icon={<Users size={20} />}
                >
                  Find Teammates datat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How TeamMatch Works</h2>
            <p className="mt-4 text-xl text-gray-600">
              Find the right people for your next hackathon project in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Hackathons</h3>
              <p className="text-gray-600">
                Discover upcoming hackathons and mark the ones you're planning to attend. Virtual or in-person, find the perfect event for your goals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Teammates</h3>
              <p className="text-gray-600">
                Search for potential teammates by skills, experience level, and roles. Our smart matching helps you find the perfect fit for your team.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Collaborate</h3>
              <p className="text-gray-600">
                Message potential teammates, form your team, and get ready to build something amazing together.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Hackathons */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Hackathons</h2>
            <Link to="/hackathons" className="text-indigo-600 hover:text-indigo-800 font-medium">
              View all →
            </Link>
          </div>
          
          {featuredHackathons.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredHackathons.map(hackathon => (
                <HackathonCard 
                  key={hackathon.id} 
                  hackathon={hackathon} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No upcoming hackathons at the moment.</p>
              <Link to="/hackathons">
                <Button className="mt-4" variant="outline">
                  Browse All Hackathons
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Members */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Teammates</h2>
            <Link to="/teammates" className="text-indigo-600 hover:text-indigo-800 font-medium">
              View all →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredUsers.map(user => (
              <UserProfileCard 
                key={user.id} 
                user={user}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your dream team?</h2>
          <p className="text-xl opacity-90 mb-8">
            Create your profile now and start connecting with potential teammates for your next hackathon.
          </p>
          <Link to={isAuthenticated ? "/dashboard" : "/register"}>
            <Button 
              size="lg" 
              variant="primary"
              className="bg-white text-indigo-600 hover:bg-gray-100"
            >
              {isAuthenticated ? "Go to Dashboard" : "Sign Up Free"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
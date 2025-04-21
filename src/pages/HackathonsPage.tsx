import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import HackathonCard from '../components/hackathon/HackathonCard';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Tabs from '../components/common/Tabs';
import { Search, Calendar, CalendarCheck, Clock } from 'lucide-react';

const HackathonsPage: React.FC = () => {
  const { hackathons, currentUser, joinHackathon, leaveHackathon } = useAppStore();
  
  const [tab, setTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationType, setLocationType] = useState('');
  
  const tabs = [
    { id: 'upcoming', label: 'Upcoming', icon: <Calendar size={16} /> },
    { id: 'joined', label: 'Joined', icon: <CalendarCheck size={16} /> },
    { id: 'past', label: 'Past Events', icon: <Clock size={16} /> },
  ];
  
  const filterHackathons = () => {
    const currentDate = new Date();
    
    // Filter by tab
    let filtered = [...hackathons];
    if (tab === 'upcoming') {
      filtered = filtered.filter(h => new Date(h.startDate) > currentDate);
    } else if (tab === 'joined') {
      if (!currentUser) return [];
      filtered = filtered.filter(h => 
        h.participants.some(p => p.userId === currentUser.id)
      );
    } else if (tab === 'past') {
      filtered = filtered.filter(h => new Date(h.endDate) < currentDate);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(h => 
        h.name.toLowerCase().includes(term) || 
        h.description.toLowerCase().includes(term) ||
        h.location.toLowerCase().includes(term)
      );
    }
    
    // Filter by location type
    if (locationType) {
      filtered = filtered.filter(h => h.locationType === locationType);
    }
    
    // Sort by start date (for upcoming and joined, most recent first)
    // For past events, sort by end date (most recent first)
    filtered = filtered.sort((a, b) => {
      if (tab === 'past') {
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      }
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
    
    return filtered;
  };
  
  const filteredHackathons = filterHackathons();
  
  const handleJoinHackathon = (hackathonId: string) => {
    if (currentUser) {
      joinHackathon(currentUser.id, hackathonId);
    }
  };
  
  const handleLeaveHackathon = (hackathonId: string) => {
    if (currentUser) {
      leaveHackathon(currentUser.id, hackathonId);
    }
  };
  
  const isParticipating = (hackathonId: string) => {
    if (!currentUser) return false;
    const hackathon = hackathons.find(h => h.id === hackathonId);
    return hackathon?.participants.some(p => p.userId === currentUser.id) || false;
  };
  
  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'virtual', label: 'Virtual' },
    { value: 'in-person', label: 'In-person' },
    { value: 'hybrid', label: 'Hybrid' },
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hackathons</h1>
        <p className="text-lg text-gray-600">
          Discover upcoming hackathons and find events that match your interests.
        </p>
      </div>
      
      <div className="mb-6">
        <Tabs 
          tabs={tabs} 
          defaultTabId="upcoming"
          onTabChange={setTab}
        />
      </div>
      
      <div className="mb-8 bg-white p-4 shadow rounded-lg">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search hackathons by name, description, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>
          <div>
            <Select
              options={locationOptions}
              value={locationType}
              onChange={setLocationType}
              label="Location Type"
            />
          </div>
        </div>
      </div>
      
      {filteredHackathons.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredHackathons.map(hackathon => (
            <HackathonCard 
              key={hackathon.id} 
              hackathon={hackathon}
              isParticipating={isParticipating(hackathon.id)}
              onJoin={() => handleJoinHackathon(hackathon.id)}
              onLeave={() => handleLeaveHackathon(hackathon.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hackathons found</h3>
          <p className="text-gray-600 mb-6">
            {tab === 'joined' 
              ? "You haven't joined any hackathons yet." 
              : "No hackathons match your search criteria."}
          </p>
          {tab === 'joined' && (
            <Link to="/hackathons" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Browse all hackathons →
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default HackathonsPage;
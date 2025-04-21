import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import UserProfileCard from '../components/profile/UserProfileCard';
import FilterPanel, { FilterOptions } from '../components/search/FilterPanel';
import Select from '../components/common/Select';
import { getSkillsByIds } from '../data/skills';

const TeammatesPage: React.FC = () => {
  const { users, hackathons, currentUser, setActiveUser } = useAppStore();
  const navigate = useNavigate();
  
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [sortOption, setSortOption] = useState('relevant');
  const [selectedHackathon, setSelectedHackathon] = useState('');
  
  // Filter users based on the filter options
  const filterUsers = (filters: FilterOptions) => {
    let result = [...users];
    
    // Don't show current user
    if (currentUser) {
      result = result.filter(user => user.id !== currentUser.id);
    }
    
    // Filter by skills
    if (filters.skills.length > 0) {
      result = result.filter(user => 
        filters.skills.some(skillId => user.skills.includes(skillId))
      );
    }
    
    // Filter by roles
    if (filters.roles.length > 0) {
      result = result.filter(user => 
        user.preferredRoles.some(role => filters.roles.includes(role))
      );
    }
    
    // Filter by experience level
    if (filters.experienceLevel) {
      result = result.filter(user => 
        user.experienceLevel === filters.experienceLevel
      );
    }
    
    // Filter by location
    if (filters.location) {
      const location = filters.location.toLowerCase();
      result = result.filter(user => 
        user.location && user.location.toLowerCase().includes(location)
      );
    }
    
    // Filter by hackathon
    if (filters.hackathonId) {
      result = result.filter(user => 
        user.hackathons.includes(filters.hackathonId as string)
      );
    } else if (selectedHackathon) {
      result = result.filter(user => 
        user.hackathons.includes(selectedHackathon)
      );
    }
    
    return result;
  };
  
  // Sort users based on the sort option
  const sortUsers = (users: typeof filteredUsers, option: string) => {
    let sorted = [...users];
    
    switch (option) {
      case 'relevant':
        // If current user exists, sort by skill match
        if (currentUser) {
          sorted = sorted.sort((a, b) => {
            const aMatches = a.skills.filter(skill => 
              currentUser.skills.includes(skill)
            ).length;
            const bMatches = b.skills.filter(skill => 
              currentUser.skills.includes(skill)
            ).length;
            return bMatches - aMatches;
          });
        }
        break;
      case 'new':
        sorted = sorted.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'experienced':
        const expRank = { beginner: 0, intermediate: 1, advanced: 2 };
        sorted = sorted.sort((a, b) => 
          expRank[b.experienceLevel] - expRank[a.experienceLevel]
        );
        break;
      default:
        break;
    }
    
    return sorted;
  };
  
  const handleFilter = (filters: FilterOptions) => {
    if (selectedHackathon) {
      filters.hackathonId = selectedHackathon;
    }
    
    const filtered = filterUsers(filters);
    const sorted = sortUsers(filtered, sortOption);
    setFilteredUsers(sorted);
  };
  
  const handleHackathonChange = (hackathonId: string) => {
    setSelectedHackathon(hackathonId);
  };
  
  const handleSortChange = (option: string) => {
    setSortOption(option);
    setFilteredUsers(sortUsers(filteredUsers, option));
  };
  
  useEffect(() => {
    // Initial filtering
    handleFilter({
      skills: [],
      roles: [],
      experienceLevel: '',
      location: '',
      hackathonId: selectedHackathon || null,
    });
  }, [selectedHackathon]);
  
  const handleViewProfile = (user: typeof users[0]) => {
    setActiveUser(user);
    navigate(`/profile/${user.id}`);
  };
  
  const handleMessageUser = (user: typeof users[0]) => {
    navigate(`/messages/${user.id}`);
  };
  
  const hackathonOptions = [
    { value: '', label: 'All Hackathons' },
    ...hackathons.map(h => ({
      value: h.id,
      label: h.name,
    })),
  ];
  
  const sortOptions = [
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'new', label: 'Newest Members' },
    { value: 'experienced', label: 'Most Experienced' },
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Teammates</h1>
        <p className="text-lg text-gray-600">
          Discover potential teammates who match your skills and interests.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel 
            onFilter={handleFilter} 
            className="sticky top-8"
          />
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-6 bg-white p-4 shadow rounded-lg flex flex-col sm:flex-row gap-4 justify-between">
            <Select
              options={hackathonOptions}
              value={selectedHackathon}
              onChange={handleHackathonChange}
              label="Filter by Hackathon"
              fullWidth={false}
              className="flex-1"
            />
            
            <Select
              options={sortOptions}
              value={sortOption}
              onChange={handleSortChange}
              label="Sort by"
              fullWidth={false}
              className="w-48"
            />
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {filteredUsers.length} teammate{filteredUsers.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {filteredUsers.length > 0 ? (
            <div className="grid gap-6">
              {filteredUsers.map(user => (
                <UserProfileCard 
                  key={user.id} 
                  user={user}
                  onMessage={() => handleMessageUser(user)}
                  onClick={() => handleViewProfile(user)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No teammates found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to find more teammates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeammatesPage;
import React, { useState } from 'react';
import { Skill, HackathonRole, ExperienceLevel } from '../../types';
import { skills, getSkillsByCategory } from '../../data/skills';
import Button from '../common/Button';
import MultiSelect from '../common/MultiSelect';
import Select from '../common/Select';
import Input from '../common/Input';
import { Search, X, Filter, BookOpen, Code, Cpu } from 'lucide-react';

interface FilterPanelProps {
  onFilter: (filters: FilterOptions) => void;
  className?: string;
}

export interface FilterOptions {
  skills: string[];
  roles: HackathonRole[];
  experienceLevel: ExperienceLevel | '';
  location: string;
  hackathonId: string | null;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  onFilter,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    skills: [],
    roles: [],
    experienceLevel: '',
    location: '',
    hackathonId: null,
  });
  
  const handleSkillsChange = (selectedSkills: string[]) => {
    setFilters({ ...filters, skills: selectedSkills });
  };
  
  const handleRolesChange = (selectedRoles: string[]) => {
    setFilters({ 
      ...filters, 
      roles: selectedRoles as HackathonRole[] 
    });
  };
  
  const handleExperienceLevelChange = (level: string) => {
    setFilters({ 
      ...filters, 
      experienceLevel: level as ExperienceLevel | '' 
    });
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, location: e.target.value });
  };
  
  const handleApplyFilters = () => {
    onFilter(filters);
  };
  
  const handleReset = () => {
    setFilters({
      skills: [],
      roles: [],
      experienceLevel: '',
      location: '',
      hackathonId: null,
    });
    onFilter({
      skills: [],
      roles: [],
      experienceLevel: '',
      location: '',
      hackathonId: null,
    });
  };
  
  const roleOptions = [
    { value: 'frontend', label: 'Frontend Developer' },
    { value: 'backend', label: 'Backend Developer' },
    { value: 'fullstack', label: 'Fullstack Developer' },
    { value: 'design', label: 'Designer' },
    { value: 'product', label: 'Product Manager' },
    { value: 'data', label: 'Data Scientist/Analyst' },
    { value: 'ml', label: 'ML Engineer' },
    { value: 'devops', label: 'DevOps Engineer' },
    { value: 'other', label: 'Other' },
  ];
  
  const experienceLevelOptions = [
    { value: '', label: 'Any Experience Level' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];
  
  const skillOptions = skills.map(skill => ({
    value: skill.id,
    label: skill.name,
  }));
  
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Filter className="mr-2 h-5 w-5 text-indigo-500" />
            Filters
          </h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Search className="mr-1 h-4 w-4" />
                Location
              </label>
              <Input
                type="text"
                placeholder="Enter a location..."
                value={filters.location}
                onChange={handleLocationChange}
              />
            </div>
            
            {isExpanded && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Code className="mr-1 h-4 w-4" />
                    Skills
                  </label>
                  <MultiSelect
                    options={skillOptions}
                    value={filters.skills}
                    onChange={handleSkillsChange}
                    placeholder="Select skills..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Cpu className="mr-1 h-4 w-4" />
                    Preferred Roles
                  </label>
                  <MultiSelect
                    options={roleOptions}
                    value={filters.roles}
                    onChange={handleRolesChange}
                    placeholder="Select roles..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <BookOpen className="mr-1 h-4 w-4" />
                    Experience Level
                  </label>
                  <Select
                    options={experienceLevelOptions}
                    value={filters.experienceLevel}
                    onChange={handleExperienceLevelChange}
                  />
                </div>
              </>
            )}
            
            <div className="flex space-x-2 pt-2">
              <Button
                variant="primary"
                fullWidth
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                icon={<X size={16} />}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
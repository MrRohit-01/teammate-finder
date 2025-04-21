import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { useForm } from 'react-hook-form';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import MultiSelect from '../components/common/MultiSelect';
import { User, HackathonRole, ExperienceLevel } from '../types';
import { Mail, User as UserIcon, MapPin, Github, Globe, Hash } from 'lucide-react';

interface RegisterFormData {
  email: string;
  displayName: string;
  location?: string;
  github?: string;
  portfolio?: string;
  bio: string;
  experienceLevel: ExperienceLevel;
}

const RegisterPage: React.FC = () => {
  const { registerUser } = useAppStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<HackathonRole[]>([]);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  
  const onSubmit = async (data: RegisterFormData) => {
    try {
      if (selectedSkills.length === 0) {
        setError('Please select at least one skill');
        return;
      }
      
      if (selectedRoles.length === 0) {
        setError('Please select at least one preferred role');
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      const userData: Partial<User> = {
        ...data,
        skills: selectedSkills,
        preferredRoles: selectedRoles,
      };
      
      await registerUser(userData);
      navigate('/dashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSkillsChange = (skills: string[]) => {
    setSelectedSkills(skills);
  };
  
  const handleRolesChange = (roles: string[]) => {
    setSelectedRoles(roles as HackathonRole[]);
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
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];
  
  const skillOptions = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'postgres', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'aws', label: 'AWS' },
    { value: 'azure', label: 'Azure' },
    { value: 'gcp', label: 'Google Cloud' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'figma', label: 'Figma' },
    { value: 'ui', label: 'UI Design' },
    { value: 'ux', label: 'UX Design' },
  ];
  
  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-indigo-600"
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
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div>
              <Input
                label="Email address"
                type="email"
                id="email"
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                error={errors.email?.message}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </div>
            
            <div>
              <Input
                label="Full name"
                type="text"
                id="displayName"
                icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                error={errors.displayName?.message}
                {...register('displayName', { 
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
              />
            </div>
            
            <div>
              <Input
                label="Location (optional)"
                type="text"
                id="location"
                icon={<MapPin className="h-5 w-5 text-gray-400" />}
                error={errors.location?.message}
                {...register('location')}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="GitHub username (optional)"
                  type="text"
                  id="github"
                  icon={<Github className="h-5 w-5 text-gray-400" />}
                  error={errors.github?.message}
                  {...register('github')}
                />
              </div>
              
              <div>
                <Input
                  label="Portfolio URL (optional)"
                  type="text"
                  id="portfolio"
                  icon={<Globe className="h-5 w-5 text-gray-400" />}
                  error={errors.portfolio?.message}
                  {...register('portfolio')}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio (max 200 characters)
              </label>
              <textarea
                id="bio"
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                maxLength={200}
                {...register('bio', { 
                  required: 'Bio is required',
                  maxLength: {
                    value: 200,
                    message: 'Bio cannot exceed 200 characters'
                  }
                })}
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
              )}
            </div>
            
            <div>
              <Select
                label="Experience Level"
                id="experienceLevel"
                options={experienceLevelOptions}
                error={errors.experienceLevel?.message}
                {...register('experienceLevel', { 
                  required: 'Experience level is required'
                })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Hash className="mr-1 h-4 w-4" />
                Skills (select at least one)
              </label>
              <MultiSelect
                options={skillOptions}
                value={selectedSkills}
                onChange={handleSkillsChange}
                placeholder="Select your skills..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Roles (select at least one)
              </label>
              <MultiSelect
                options={roleOptions}
                value={selectedRoles}
                onChange={handleRolesChange}
                placeholder="Select your preferred roles..."
              />
            </div>

            <div>
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
              >
                Create account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
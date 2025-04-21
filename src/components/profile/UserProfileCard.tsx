import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types';
import { getSkillsByIds } from '../../data/skills';
import Card, { CardContent } from '../common/Card';
import Avatar from '../common/Avatar';
import SkillBadge from '../common/SkillBadge';
import Button from '../common/Button';
import { MapPin, Github, Globe, MessageSquare } from 'lucide-react';

interface UserProfileCardProps {
  user: User;
  isCurrentUser?: boolean;
  onMessage?: () => void;
  className?: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  isCurrentUser = false,
  onMessage,
  className = '',
}) => {
  // Limit skills to a reasonable number for display
  const displaySkills = getSkillsByIds(user.skills.slice(0, 5));
  const skillsCount = user.skills.length;
  const hasMoreSkills = skillsCount > 5;
  
  return (
    <Card className={`hover:shadow-md transition-all duration-300 ${className}`}>
      <CardContent>
        <div className="flex items-start">
          <Avatar 
            src={user.photoURL} 
            name={user.displayName} 
            size="lg" 
          />
          
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg text-gray-900">
                  {user.displayName}
                </h3>
                {user.location && (
                  <p className="text-gray-500 text-sm flex items-center mt-1">
                    <MapPin size={14} className="mr-1" />
                    {user.location}
                  </p>
                )}
              </div>
              
              <div className="flex space-x-2">
                {isCurrentUser ? (
                  <Link to="/profile/edit">
                    <Button size="sm" variant="outline">Edit Profile</Button>
                  </Link>
                ) : (
                  <Button 
                    size="sm" 
                    variant="primary" 
                    icon={<MessageSquare size={16} />}
                    onClick={onMessage}
                  >
                    Message
                  </Button>
                )}
              </div>
            </div>
            
            <p className="mt-2 text-sm text-gray-700">{user.bio}</p>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {displaySkills.map(skill => (
                <SkillBadge key={skill.id} skillId={skill.id} size="sm" />
              ))}
              {hasMoreSkills && (
                <span className="text-xs text-gray-500 flex items-center">
                  +{skillsCount - 5} more
                </span>
              )}
            </div>
            
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {user.github && (
                <a 
                  href={`https://github.com/${user.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <Github size={14} className="mr-1" />
                  GitHub
                </a>
              )}
              {user.portfolio && (
                <a 
                  href={user.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <Globe size={14} className="mr-1" />
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
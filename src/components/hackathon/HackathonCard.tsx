import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Hackathon } from '../../types';
import Card, { CardContent } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';

interface HackathonCardProps {
  hackathon: Hackathon;
  className?: string;
  isParticipating?: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
}

const HackathonCard: React.FC<HackathonCardProps> = ({
  hackathon,
  className = '',
  isParticipating = false,
  onJoin,
  onLeave,
}) => {
  const getLocationBadgeVariant = () => {
    switch (hackathon.locationType) {
      case 'virtual':
        return 'info';
      case 'in-person':
        return 'success';
      case 'hybrid':
        return 'secondary';
      default:
        return 'default';
    }
  };
  
  const formatDateRange = () => {
    const startDate = format(new Date(hackathon.startDate), 'MMM d');
    const endDate = format(new Date(hackathon.endDate), 'MMM d, yyyy');
    return `${startDate} - ${endDate}`;
  };
  
  return (
    <Card className={`hover:shadow-md transition-all duration-300 ${className}`}>
      <CardContent>
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              <Link to={`/hackathons/${hackathon.id}`} className="hover:text-indigo-600">
                {hackathon.name}
              </Link>
            </h3>
            
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
              {formatDateRange()}
            </div>
            
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
              {hackathon.location}
            </div>
            
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
              <span>
                {hackathon.participants.length} participant{hackathon.participants.length !== 1 ? 's' : ''} · 
                {' '}Max team size: {hackathon.maxTeamSize}
              </span>
            </div>
            
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {hackathon.description}
            </p>
            
            <div className="mt-3 flex space-x-2">
              <Badge variant={getLocationBadgeVariant()} size="sm">
                {hackathon.locationType === 'virtual' ? 'Virtual' : 
                 hackathon.locationType === 'in-person' ? 'In-person' : 'Hybrid'}
              </Badge>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col space-y-2">
            {isParticipating ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLeave}
              >
                Leave Hackathon
              </Button>
            ) : (
              <Button 
                variant="primary" 
                size="sm"
                onClick={onJoin}
              >
                Join Hackathon
              </Button>
            )}
            
            {hackathon.website && (
              <a 
                href={hackathon.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center justify-center"
              >
                <ExternalLink size={14} className="mr-1" />
                Visit Website
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HackathonCard;
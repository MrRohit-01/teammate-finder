import React from 'react';
import { TeamRequest } from '../types';
import { useAppStore } from '../store';
import Card, { CardContent, CardFooter } from './common/Card';
import Avatar from './common/Avatar';
import Button from './common/Button';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface TeamRequestCardProps {
  request: TeamRequest;
  type: 'sent' | 'received';  
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
  className?: string;
}

const TeamRequestCard: React.FC<TeamRequestCardProps> = ({
  request,
  type,
  onAccept,
  onReject,
  className = '',
}) => {
  const { users, hackathons } = useAppStore();
  
  const user = users.find(u => 
    type === 'sent' ? u.id === request.toUserId : u.id === request.fromUserId
  );
  
  const hackathon = hackathons.find(h => h.id === request.hackathonId);
  
  if (!user || !hackathon) return null;
  
  return (
    <Card className={className}>
      <CardContent>
        <div className="sm:flex sm:items-start sm:justify-between">
          <div className="flex items-start">
            <Avatar 
              src={user.photoURL}
              name={user.displayName}
              size="md"
            />
            
            <div className="ml-4">
              <h3 className="text-base font-medium text-gray-900">
                {type === 'sent' ? `Request to ${user.displayName}` : `Request from ${user.displayName}`}
              </h3>
              
              <p className="mt-1 text-sm text-gray-600">
                {type === 'sent' ? 'You requested to' : 'Wants to'} team up for:
              </p>
              
              <div className="mt-1 text-sm font-medium text-indigo-600">
                {hackathon.name}
              </div>
              
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <Calendar className="flex-shrink-0 mr-1.5 h-3 w-3 text-gray-400" />
                {format(new Date(hackathon.startDate), 'MMM d')} - {format(new Date(hackathon.endDate), 'MMM d, yyyy')}
              </div>
              
              {request.message && (
                <div className="mt-2 text-sm text-gray-600 border-l-2 border-gray-200 pl-3 italic">
                  "{request.message}"
                </div>
              )}
              
              <div className="mt-2 text-xs text-gray-500">
                Sent {format(new Date(request.createdAt), 'MMM d, yyyy')}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      {type === 'received' && request.status === 'pending' && (
        <CardFooter className="flex justify-end space-x-2 bg-gray-50">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onReject && onReject(request.id)}
          >
            Decline
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onAccept && onAccept(request.id)}
          >
            Accept
          </Button>
        </CardFooter>
      )}
      
      {request.status !== 'pending' && (
        <CardFooter className="bg-gray-50">
          <div className={`
            text-sm font-medium ${
              request.status === 'accepted' 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}
          >
            {request.status === 'accepted' ? 'Accepted' : 'Declined'}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default TeamRequestCard;
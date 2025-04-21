import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAppStore } from '../store';
import Card, { CardContent, CardHeader } from '../components/common/Card';
import TeamRequestCard from '../components/TeamRequestCard';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import { 
  Bell, 
  Users, 
  Calendar, 
  Award, 
  MessageSquare, 
  UserCircle,
  ArrowRight
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    isAuthenticated,
    hackathons,
    notifications,
    teamRequests,
    users,
    respondToTeamRequest,
    markNotificationAsRead
  } = useAppStore();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">You need to be logged in</h3>
          <p className="text-gray-600">
            Please log in to access your dashboard.
          </p>
        </div>
      </div>
    );
  }
  
  // Get user's hackathons
  const userHackathons = hackathons.filter(h => 
    currentUser.hackathons.includes(h.id)
  );
  
  // Get upcoming hackathons
  const upcomingHackathons = userHackathons.filter(h => 
    new Date(h.startDate) > new Date()
  ).sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  
  // Get user's notifications
  const userNotifications = notifications
    .filter(n => n.userId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  // Get team requests
  const sentRequests = teamRequests
    .filter(r => r.fromUserId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const receivedRequests = teamRequests
    .filter(r => r.toUserId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const pendingRequests = receivedRequests.filter(r => r.status === 'pending');
  
  const handleAcceptRequest = (requestId: string) => {
    respondToTeamRequest(requestId, true);
  };
  
  const handleRejectRequest = (requestId: string) => {
    respondToTeamRequest(requestId, false);
  };
  
  const getNotificationContent = (notification: typeof notifications[0]) => {
    const { type, content, relatedId } = notification;
    
    if (type === 'message') {
      return (
        <div className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-1.5 text-indigo-500" />
          <span>{content}</span>
        </div>
      );
    }
    
    if (type === 'team_request') {
      return (
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1.5 text-indigo-500" />
          <span>{content}</span>
        </div>
      );
    }
    
    if (type === 'team_accepted') {
      return (
        <div className="flex items-center">
          <Award className="h-4 w-4 mr-1.5 text-green-500" />
          <span>{content}</span>
        </div>
      );
    }
    
    return content;
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {currentUser.displayName.split(' ')[0]}!
        </h1>
        <p className="text-lg text-gray-600">
          Manage your hackathons, team requests, and messages.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Hackathons</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {userHackathons.length}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {upcomingHackathons.length} upcoming
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Team Requests</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {pendingRequests.length}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Pending approval
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <Bell className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {userNotifications.filter(n => !n.read).length}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Unread
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Hackathons</h2>
              <Link to="/hackathons" className="text-sm text-indigo-600 hover:text-indigo-800">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingHackathons.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {upcomingHackathons.slice(0, 3).map(hackathon => (
                    <div key={hackathon.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex justify-between">
                        <div>
                          <Link 
                            to={`/hackathons/${hackathon.id}`}
                            className="text-base font-medium text-gray-900 hover:text-indigo-600"
                          >
                            {hackathon.name}
                          </Link>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {format(new Date(hackathon.startDate), 'MMM d')} - {format(new Date(hackathon.endDate), 'MMM d, yyyy')}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-1 overflow-hidden">
                            {hackathon.participants.slice(0, 3).map(participant => {
                              const user = users.find(u => u.id === participant.userId);
                              return (
                                <Avatar
                                  key={participant.userId}
                                  src={user?.photoURL}
                                  name={user?.displayName}
                                  size="xs"
                                  className="ring-2 ring-white"
                                />
                              );
                            })}
                            {hackathon.participants.length > 3 && (
                              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-xs font-medium text-gray-500 ring-2 ring-white">
                                +{hackathon.participants.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    You haven't joined any upcoming hackathons yet.
                  </p>
                  <Link to="/hackathons">
                    <Button variant="primary" size="sm">
                      Browse Hackathons
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Team Requests</h2>
              <span className="text-sm text-gray-500">
                {pendingRequests.length} pending
              </span>
            </CardHeader>
            <CardContent>
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.slice(0, 3).map(request => (
                    <TeamRequestCard
                      key={request.id}
                      request={request}
                      type="received"
                      onAccept={handleAcceptRequest}
                      onReject={handleRejectRequest}
                    />
                  ))}
                  
                  {pendingRequests.length > 3 && (
                    <div className="text-center pt-2">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        View all requests
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    You don't have any pending team requests.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-8">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <UserCircle className="mr-2 h-5 w-5 text-indigo-500" />
                Your Profile
              </h2>
              <Link to="/profile/edit" className="text-sm text-indigo-600 hover:text-indigo-800">
                Edit
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Avatar 
                  src={currentUser.photoURL}
                  name={currentUser.displayName}
                  size="lg"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {currentUser.displayName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {currentUser.experienceLevel.charAt(0).toUpperCase() + currentUser.experienceLevel.slice(1)} • {' '}
                    {currentUser.preferredRoles.map(role => 
                      role.charAt(0).toUpperCase() + role.slice(1)
                    ).join(', ')}
                  </p>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {currentUser.bio}
              </div>
              <div className="mt-4">
                <Link to="/profile">
                  <Button variant="outline" size="sm" fullWidth>
                    View Full Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Bell className="mr-2 h-5 w-5 text-indigo-500" />
                Recent Notifications
              </h2>
              <Link to="/notifications" className="text-sm text-indigo-600 hover:text-indigo-800">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {userNotifications.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {userNotifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`py-3 first:pt-0 last:pb-0 ${!notification.read ? 'bg-indigo-50' : ''}`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex">
                        <div className="flex-1 text-sm">
                          {getNotificationContent(notification)}
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(notification.createdAt), 'MMM d, h:mm a')}
                          </p>
                        </div>
                        {!notification.read && (
                          <span className="h-2 w-2 bg-indigo-500 rounded-full mt-1.5"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    You don't have any notifications.
                  </p>
                </div>
              )}
              
              {userNotifications.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link to="/notifications" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-center">
                    <span>View all notifications</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
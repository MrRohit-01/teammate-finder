import { create } from 'zustand';
import { User, Hackathon, Message, Notification, TeamRequest } from '../types';
import { users, hackathons, messages, notifications, teamRequests } from '../data/mockData';

interface AppState {
  // Auth state
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Data
  users: User[];
  hackathons: Hackathon[];
  messages: Message[];
  notifications: Notification[];
  teamRequests: TeamRequest[];
  
  // UI state
  isLoading: boolean;
  activeHackathon: Hackathon | null;
  activeUser: User | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerUser: (userData: Partial<User>) => Promise<void>;
  updateProfile: (userId: string, data: Partial<User>) => Promise<void>;
  
  joinHackathon: (userId: string, hackathonId: string) => Promise<void>;
  leaveHackathon: (userId: string, hackathonId: string) => Promise<void>;
  
  sendMessage: (senderId: string, receiverId: string, content: string) => Promise<void>;
  markMessageAsRead: (messageId: string) => void;
  
  sendTeamRequest: (fromUserId: string, toUserId: string, hackathonId: string, message?: string) => Promise<void>;
  respondToTeamRequest: (requestId: string, accept: boolean) => Promise<void>;
  
  markNotificationAsRead: (notificationId: string) => void;
  
  setActiveHackathon: (hackathon: Hackathon | null) => void;
  setActiveUser: (user: User | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentUser: null,
  isAuthenticated: false,
  users,
  hackathons,
  messages,
  notifications,
  teamRequests,
  isLoading: false,
  activeHackathon: null,
  activeUser: null,
  
  // Actions
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // In a real app, this would authenticate with a backend
      // For this demo, we'll just find a matching user in our mock data
      const user = users.find(u => u.email === email);
      if (user) {
        set({ currentUser: user, isAuthenticated: true });
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      set({ isLoading: false });
    }
  },
  
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },
  
  registerUser: async (userData) => {
    set({ isLoading: true });
    try {
      // Create a new user
      const newUser: User = {
        id: `user${users.length + 1}`,
        email: userData.email || '',
        displayName: userData.displayName || '',
        photoURL: userData.photoURL,
        bio: userData.bio || '',
        location: userData.location,
        github: userData.github,
        portfolio: userData.portfolio,
        skills: userData.skills || [],
        experienceLevel: userData.experienceLevel || 'beginner',
        preferredRoles: userData.preferredRoles || [],
        hackathons: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      set(state => ({
        users: [...state.users, newUser],
        currentUser: newUser,
        isAuthenticated: true
      }));
    } finally {
      set({ isLoading: false });
    }
  },
  
  updateProfile: async (userId, data) => {
    set({ isLoading: true });
    try {
      set(state => ({
        users: state.users.map(user => 
          user.id === userId ? { ...user, ...data, updatedAt: new Date() } : user
        ),
        currentUser: state.currentUser?.id === userId 
          ? { ...state.currentUser, ...data, updatedAt: new Date() } 
          : state.currentUser
      }));
    } finally {
      set({ isLoading: false });
    }
  },
  
  joinHackathon: async (userId, hackathonId) => {
    set({ isLoading: true });
    try {
      set(state => ({
        hackathons: state.hackathons.map(hackathon => 
          hackathon.id === hackathonId 
            ? {
                ...hackathon,
                participants: [
                  ...hackathon.participants.filter(p => p.userId !== userId),
                  { userId, status: 'seeking', joinedAt: new Date() }
                ]
              }
            : hackathon
        ),
        users: state.users.map(user => 
          user.id === userId 
            ? {
                ...user,
                hackathons: user.hackathons.includes(hackathonId) 
                  ? user.hackathons 
                  : [...user.hackathons, hackathonId]
              }
            : user
        ),
        currentUser: state.currentUser?.id === userId 
          ? {
              ...state.currentUser,
              hackathons: state.currentUser.hackathons.includes(hackathonId)
                ? state.currentUser.hackathons
                : [...state.currentUser.hackathons, hackathonId]
            }
          : state.currentUser
      }));
    } finally {
      set({ isLoading: false });
    }
  },
  
  leaveHackathon: async (userId, hackathonId) => {
    set({ isLoading: true });
    try {
      set(state => ({
        hackathons: state.hackathons.map(hackathon => 
          hackathon.id === hackathonId 
            ? {
                ...hackathon,
                participants: hackathon.participants.filter(p => p.userId !== userId)
              }
            : hackathon
        ),
        users: state.users.map(user => 
          user.id === userId 
            ? {
                ...user,
                hackathons: user.hackathons.filter(id => id !== hackathonId)
              }
            : user
        ),
        currentUser: state.currentUser?.id === userId 
          ? {
              ...state.currentUser,
              hackathons: state.currentUser.hackathons.filter(id => id !== hackathonId)
            }
          : state.currentUser
      }));
    } finally {
      set({ isLoading: false });
    }
  },
  
  sendMessage: async (senderId, receiverId, content) => {
    const newMessage: Message = {
      id: `msg${messages.length + 1}`,
      senderId,
      receiverId,
      content,
      read: false,
      createdAt: new Date()
    };
    
    const newNotification: Notification = {
      id: `notif${notifications.length + 1}`,
      userId: receiverId,
      type: 'message',
      content: `New message from ${users.find(u => u.id === senderId)?.displayName}`,
      read: false,
      relatedId: newMessage.id,
      createdAt: new Date()
    };
    
    set(state => ({
      messages: [...state.messages, newMessage],
      notifications: [...state.notifications, newNotification]
    }));
  },
  
  markMessageAsRead: (messageId) => {
    set(state => ({
      messages: state.messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ),
      notifications: state.notifications.map(notif => 
        notif.type === 'message' && notif.relatedId === messageId 
          ? { ...notif, read: true } 
          : notif
      )
    }));
  },
  
  sendTeamRequest: async (fromUserId, toUserId, hackathonId, message) => {
    const newRequest: TeamRequest = {
      id: `request${teamRequests.length + 1}`,
      fromUserId,
      toUserId,
      hackathonId,
      message,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const sender = users.find(u => u.id === fromUserId);
    const hackathon = hackathons.find(h => h.id === hackathonId);
    
    const newNotification: Notification = {
      id: `notif${notifications.length + 1}`,
      userId: toUserId,
      type: 'team_request',
      content: `${sender?.displayName} wants to join your team for ${hackathon?.name}`,
      read: false,
      relatedId: newRequest.id,
      createdAt: new Date()
    };
    
    set(state => ({
      teamRequests: [...state.teamRequests, newRequest],
      notifications: [...state.notifications, newNotification]
    }));
  },
  
  respondToTeamRequest: async (requestId, accept) => {
    set(state => ({
      teamRequests: state.teamRequests.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              status: accept ? 'accepted' : 'rejected',
              updatedAt: new Date()
            } 
          : req
      )
    }));
    
    if (accept) {
      const request = teamRequests.find(r => r.id === requestId);
      if (!request) return;
      
      const newNotification: Notification = {
        id: `notif${notifications.length + 1}`,
        userId: request.fromUserId,
        type: 'team_accepted',
        content: `Your team request for ${hackathons.find(h => h.id === request.hackathonId)?.name} was accepted`,
        read: false,
        relatedId: requestId,
        createdAt: new Date()
      };
      
      set(state => ({
        notifications: [...state.notifications, newNotification]
      }));
    }
  },
  
  markNotificationAsRead: (notificationId) => {
    set(state => ({
      notifications: state.notifications.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    }));
  },
  
  setActiveHackathon: (hackathon) => {
    set({ activeHackathon: hackathon });
  },
  
  setActiveUser: (user) => {
    set({ activeUser: user });
  }
}));
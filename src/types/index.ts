export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type HackathonRole = 
  | 'frontend' 
  | 'backend' 
  | 'fullstack' 
  | 'design' 
  | 'product' 
  | 'data' 
  | 'ml' 
  | 'devops' 
  | 'other';

export type TeamStatus = 'seeking' | 'complete';

export type HackathonLocationType = 'virtual' | 'in-person' | 'hybrid';

export interface Skill {
  id: string;
  name: string;
  category: 'language' | 'framework' | 'tool' | 'other';
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio: string;
  location?: string;
  github?: string;
  portfolio?: string;
  skills: string[]; // Skill IDs
  experienceLevel: ExperienceLevel;
  preferredRoles: HackathonRole[];
  hackathons: string[]; // Hackathon IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface Hackathon {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  locationType: HackathonLocationType;
  website?: string;
  maxTeamSize: number;
  participants: HackathonParticipant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface HackathonParticipant {
  userId: string;
  status: TeamStatus;
  teamId?: string;
  joinedAt: Date;
}

export interface Team {
  id: string;
  hackathonId: string;
  name: string;
  description?: string;
  members: string[]; // User IDs
  leaderId: string;
  status: TeamStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'team_request' | 'team_accepted' | 'system';
  content: string;
  read: boolean;
  relatedId?: string; // Message ID, Team ID, etc.
  createdAt: Date;
}

export interface TeamRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  hackathonId: string;
  teamId?: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
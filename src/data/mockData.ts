import { User, Hackathon, HackathonLocationType, Message, Notification, TeamRequest } from '../types';

// Mock users
export const users: User[] = [
  {
    id: 'user1',
    email: 'john.doe@example.com',
    displayName: 'John Doe',
    photoURL: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Fullstack developer passionate about building intuitive UIs and scalable backends.',
    location: 'San Francisco, CA',
    github: 'johndoe',
    portfolio: 'https://johndoe.dev',
    skills: ['js', 'ts', 'react', 'nodejs', 'mongodb'],
    experienceLevel: 'advanced',
    preferredRoles: ['frontend', 'backend'],
    hackathons: ['hackathon1', 'hackathon2'],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: 'user2',
    email: 'jane.smith@example.com',
    displayName: 'Jane Smith',
    photoURL: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'UI/UX designer focused on creating beautiful, accessible interfaces.',
    location: 'New York, NY',
    github: 'janesmith',
    portfolio: 'https://janesmith.design',
    skills: ['figma', 'ui', 'ux', 'react', 'js'],
    experienceLevel: 'intermediate',
    preferredRoles: ['design', 'frontend'],
    hackathons: ['hackathon1'],
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-07-20')
  },
  {
    id: 'user3',
    email: 'alex.johnson@example.com',
    displayName: 'Alex Johnson',
    photoURL: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Machine learning engineer interested in NLP and computer vision.',
    location: 'Seattle, WA',
    github: 'alexj',
    portfolio: 'https://alexj.dev',
    skills: ['python', 'tensorflow', 'pytorch', 'pandas'],
    experienceLevel: 'advanced',
    preferredRoles: ['ml', 'data'],
    hackathons: ['hackathon2'],
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-08-05')
  },
  {
    id: 'user4',
    email: 'sam.wilson@example.com',
    displayName: 'Sam Wilson',
    photoURL: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'DevOps engineer specializing in cloud infrastructure and CI/CD pipelines.',
    location: 'Austin, TX',
    github: 'samw',
    skills: ['docker', 'kubernetes', 'aws', 'terraform'],
    experienceLevel: 'intermediate',
    preferredRoles: ['devops', 'backend'],
    hackathons: ['hackathon3'],
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-09-10')
  },
  {
    id: 'user5',
    email: 'mia.chen@example.com',
    displayName: 'Mia Chen',
    photoURL: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Product manager with a background in software development.',
    location: 'Chicago, IL',
    github: 'miachen',
    portfolio: 'https://miachen.me',
    skills: ['pm', 'agile', 'figma', 'js'],
    experienceLevel: 'advanced',
    preferredRoles: ['product'],
    hackathons: ['hackathon1', 'hackathon3'],
    createdAt: new Date('2023-05-05'),
    updatedAt: new Date('2023-10-15')
  }
];

// Mock hackathons
export const hackathons: Hackathon[] = [
  {
    id: 'hackathon1',
    name: 'TechCrunch Disrupt Hackathon',
    description: 'Build innovative solutions for real-world problems in just 24 hours.',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2023-12-03'),
    location: 'San Francisco, CA',
    locationType: 'in-person' as HackathonLocationType,
    website: 'https://techcrunch.com/events/disrupt-sf-hackathon',
    maxTeamSize: 5,
    participants: [
      { userId: 'user1', status: 'seeking', joinedAt: new Date('2023-10-15') },
      { userId: 'user2', status: 'seeking', joinedAt: new Date('2023-10-20') },
      { userId: 'user5', status: 'seeking', joinedAt: new Date('2023-10-25') }
    ],
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2023-09-01')
  },
  {
    id: 'hackathon2',
    name: 'Global AI Hackathon',
    description: 'Develop AI-powered solutions to address global challenges.',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-17'),
    location: 'Online',
    locationType: 'virtual' as HackathonLocationType,
    website: 'https://ai-hackathon.dev',
    maxTeamSize: 4,
    participants: [
      { userId: 'user1', status: 'seeking', joinedAt: new Date('2023-11-10') },
      { userId: 'user3', status: 'seeking', joinedAt: new Date('2023-11-15') }
    ],
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-10-01')
  },
  {
    id: 'hackathon3',
    name: 'HealthTech Innovators',
    description: 'Create solutions that transform healthcare delivery and patient outcomes.',
    startDate: new Date('2024-02-10'),
    endDate: new Date('2024-02-12'),
    location: 'Boston, MA',
    locationType: 'hybrid' as HackathonLocationType,
    website: 'https://healthtech-hackathon.org',
    maxTeamSize: 6,
    participants: [
      { userId: 'user4', status: 'seeking', joinedAt: new Date('2023-12-01') },
      { userId: 'user5', status: 'seeking', joinedAt: new Date('2023-12-05') }
    ],
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2023-11-01')
  }
];

// Mock messages
export const messages: Message[] = [
  {
    id: 'msg1',
    senderId: 'user1',
    receiverId: 'user2',
    content: 'Hey Jane, I saw you\'re participating in TechCrunch Disrupt. Would you be interested in forming a team?',
    read: true,
    createdAt: new Date('2023-10-25T14:30:00')
  },
  {
    id: 'msg2',
    senderId: 'user2',
    receiverId: 'user1',
    content: 'Hi John! Yes, I\'m looking for a team. What kind of project are you thinking about?',
    read: true,
    createdAt: new Date('2023-10-25T15:45:00')
  },
  {
    id: 'msg3',
    senderId: 'user1',
    receiverId: 'user2',
    content: 'I was thinking about building a platform that helps people find mentors in tech. Your design skills would be perfect for it!',
    read: false,
    createdAt: new Date('2023-10-25T16:20:00')
  },
  {
    id: 'msg4',
    senderId: 'user3',
    receiverId: 'user1',
    content: 'Hello John, are you still looking for team members for the Global AI Hackathon?',
    read: false,
    createdAt: new Date('2023-11-20T09:15:00')
  }
];

// Mock notifications
export const notifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    type: 'message',
    content: 'New message from Jane Smith',
    read: true,
    relatedId: 'msg2',
    createdAt: new Date('2023-10-25T15:45:00')
  },
  {
    id: 'notif2',
    userId: 'user2',
    type: 'message',
    content: 'New message from John Doe',
    read: false,
    relatedId: 'msg3',
    createdAt: new Date('2023-10-25T16:20:00')
  },
  {
    id: 'notif3',
    userId: 'user1',
    type: 'team_request',
    content: 'Sam Wilson wants to join your team for HealthTech Innovators',
    read: false,
    relatedId: 'request1',
    createdAt: new Date('2023-12-10T11:30:00')
  },
  {
    id: 'notif4',
    userId: 'user1',
    type: 'message',
    content: 'New message from Alex Johnson',
    read: false,
    relatedId: 'msg4',
    createdAt: new Date('2023-11-20T09:15:00')
  }
];

// Mock team requests
export const teamRequests: TeamRequest[] = [
  {
    id: 'request1',
    fromUserId: 'user4',
    toUserId: 'user1',
    hackathonId: 'hackathon3',
    message: 'I\'d love to join your team for the HealthTech Hackathon. I can help with DevOps and backend infrastructure.',
    status: 'pending',
    createdAt: new Date('2023-12-10T11:30:00'),
    updatedAt: new Date('2023-12-10T11:30:00')
  },
  {
    id: 'request2',
    fromUserId: 'user1',
    toUserId: 'user3',
    hackathonId: 'hackathon2',
    message: 'Would you like to join forces for the Global AI Hackathon? Your ML expertise would be valuable.',
    status: 'accepted',
    createdAt: new Date('2023-11-18T14:20:00'),
    updatedAt: new Date('2023-11-19T09:45:00')
  }
];
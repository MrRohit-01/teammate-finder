import { Skill } from '../types';

export const skills: Skill[] = [
  // Programming Languages
  { id: 'js', name: 'JavaScript', category: 'language' },
  { id: 'ts', name: 'TypeScript', category: 'language' },
  { id: 'python', name: 'Python', category: 'language' },
  { id: 'java', name: 'Java', category: 'language' },
  { id: 'csharp', name: 'C#', category: 'language' },
  { id: 'cpp', name: 'C++', category: 'language' },
  { id: 'go', name: 'Go', category: 'language' },
  { id: 'rust', name: 'Rust', category: 'language' },
  { id: 'ruby', name: 'Ruby', category: 'language' },
  { id: 'php', name: 'PHP', category: 'language' },
  { id: 'swift', name: 'Swift', category: 'language' },
  { id: 'kotlin', name: 'Kotlin', category: 'language' },
  
  // Frameworks & Libraries
  { id: 'react', name: 'React', category: 'framework' },
  { id: 'angular', name: 'Angular', category: 'framework' },
  { id: 'vue', name: 'Vue.js', category: 'framework' },
  { id: 'nextjs', name: 'Next.js', category: 'framework' },
  { id: 'django', name: 'Django', category: 'framework' },
  { id: 'flask', name: 'Flask', category: 'framework' },
  { id: 'express', name: 'Express.js', category: 'framework' },
  { id: 'spring', name: 'Spring Boot', category: 'framework' },
  { id: 'laravel', name: 'Laravel', category: 'framework' },
  { id: 'rails', name: 'Ruby on Rails', category: 'framework' },
  { id: 'dotnet', name: '.NET', category: 'framework' },
  { id: 'flutter', name: 'Flutter', category: 'framework' },
  { id: 'reactnative', name: 'React Native', category: 'framework' },
  
  // Tools & Technologies
  { id: 'docker', name: 'Docker', category: 'tool' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'tool' },
  { id: 'aws', name: 'AWS', category: 'tool' },
  { id: 'azure', name: 'Azure', category: 'tool' },
  { id: 'gcp', name: 'Google Cloud', category: 'tool' },
  { id: 'git', name: 'Git', category: 'tool' },
  { id: 'graphql', name: 'GraphQL', category: 'tool' },
  { id: 'rest', name: 'REST API', category: 'tool' },
  { id: 'figma', name: 'Figma', category: 'tool' },
  { id: 'photoshop', name: 'Photoshop', category: 'tool' },
  { id: 'sketch', name: 'Sketch', category: 'tool' },
  { id: 'xd', name: 'Adobe XD', category: 'tool' },
  
  // Data & ML
  { id: 'tensorflow', name: 'TensorFlow', category: 'tool' },
  { id: 'pytorch', name: 'PyTorch', category: 'tool' },
  { id: 'pandas', name: 'Pandas', category: 'tool' },
  { id: 'tableau', name: 'Tableau', category: 'tool' },
  { id: 'sql', name: 'SQL', category: 'language' },
  { id: 'mongodb', name: 'MongoDB', category: 'tool' },
  { id: 'postgres', name: 'PostgreSQL', category: 'tool' },
  { id: 'redis', name: 'Redis', category: 'tool' },
  
  // Other
  { id: 'agile', name: 'Agile/Scrum', category: 'other' },
  { id: 'testing', name: 'Testing', category: 'other' },
  { id: 'ui', name: 'UI Design', category: 'other' },
  { id: 'ux', name: 'UX Design', category: 'other' },
  { id: 'pm', name: 'Project Management', category: 'other' },
  { id: 'devops', name: 'DevOps', category: 'other' },
  { id: 'seo', name: 'SEO', category: 'other' },
  { id: 'marketing', name: 'Digital Marketing', category: 'other' },
];

export const getSkillById = (id: string): Skill | undefined => {
  return skills.find(skill => skill.id === id);
};

export const getSkillsByIds = (ids: string[]): Skill[] => {
  return skills.filter(skill => ids.includes(skill.id));
};

export const getSkillsByCategory = (category: Skill['category']): Skill[] => {
  return skills.filter(skill => skill.category === category);
};
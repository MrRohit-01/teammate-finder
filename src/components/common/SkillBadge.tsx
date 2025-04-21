import React from 'react';
import Badge from './Badge';
import { getSkillById } from '../../data/skills';
import { Book, Code, Wrench, FileCode } from 'lucide-react';

interface SkillBadgeProps {
  skillId: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({
  skillId,
  size = 'md',
  onClick,
  selected = false,
  className = '',
}) => {
  const skill = getSkillById(skillId);
  
  if (!skill) return null;
  
  const getCategoryIcon = () => {
    const iconSize = size === 'sm' ? 12 : size === 'md' ? 14 : 16;
    const commonProps = { size: iconSize, className: 'mr-1 -ml-0.5' };
    
    switch (skill.category) {
      case 'language':
        return <Code {...commonProps} />;
      case 'framework':
        return <FileCode {...commonProps} />;
      case 'tool':
        return <Wrench {...commonProps} />;
      default:
        return <Book {...commonProps} />;
    }
  };
  
  let badgeVariant: 'default' | 'primary' | 'secondary' | 'info' = 'default';
  
  switch (skill.category) {
    case 'language':
      badgeVariant = 'info';
      break;
    case 'framework':
      badgeVariant = 'primary';
      break;
    case 'tool':
      badgeVariant = 'secondary';
      break;
    default:
      badgeVariant = 'default';
  }
  
  if (selected) {
    badgeVariant = 'primary';
  }
  
  const clickableStyles = onClick ? 'cursor-pointer hover:shadow-sm transition-all duration-200' : '';
  
  return (
    <Badge
      variant={badgeVariant}
      size={size}
      className={`flex items-center ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {getCategoryIcon()}
      {skill.name}
    </Badge>
  );
};

export default SkillBadge;
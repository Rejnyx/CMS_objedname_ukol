import React from 'react';
import * as Icons from 'lucide-react';

// Vytvoříme kopii a odstraníme ne-komponentní exporty
const iconComponents = { ...Icons };
delete (iconComponents as any).createLucideIcon;
delete (iconComponents as any).default; // často alias pro 'index'
delete (iconComponents as any).index;

type LucideIconName = keyof typeof iconComponents;

interface DynamicIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = iconComponents[name as LucideIconName] as React.ElementType;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;

import React from 'react';
import type { Category } from '../../types';
import {
  Breadcrumb as UiBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbProps {
  path: Category[];
  onNavigate: (category: Category) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onNavigate }) => {
  return (
    <UiBreadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Nabídka</BreadcrumbPage>
        </BreadcrumbItem>
        {path.map((category, index) => {
          const isLast = index === path.length - 1;
          return (
            <React.Fragment key={category.id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{category.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    onClick={() => onNavigate(category)}
                    style={{cursor: 'pointer'}}
                  >
                    {category.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </UiBreadcrumb>
  );
};

export default Breadcrumb;

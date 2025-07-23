import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableCategoryItem } from './SortableCategoryItem.tsx';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { Category } from '../../types.ts';
import DynamicIcon from '../common/DynamicIcon.tsx';
import { Input } from '@/components/ui/input';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const CategoryListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ScrollableCategoryArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.sm}; // Prostor pro scrollbar
`;

interface CategoryItemProps {
  $isSelected: boolean;
}

const CategoryItemStyled = styled.div<CategoryItemProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $isSelected, theme }) => $isSelected ? theme.colors.primary.light : 'transparent'};
  color: ${({ $isSelected, theme }) => $isSelected ? theme.colors.primary.contrast : 'inherit'};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme, $isSelected }) => $isSelected ? theme.colors.primary.main : theme.colors.neutral.gray100};
  }
`;

const IconWrapper = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral.gray200};
    }
`;

const CategoryRow = styled.div<{ $level: number }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding-left: ${({ $level, theme }) => `${$level * 1.5}rem`};
`;


interface RenderCategoryProps {
    category: Category;
    selectedCategory: Category | null;
    onSelectCategory: (category: Category) => void;
    level: number;
}

const RenderCategory: React.FC<RenderCategoryProps> = ({ category, selectedCategory, onSelectCategory, level }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isSelected = selectedCategory?.id === category.id;
    const hasSubcategories = category.subCategories && category.subCategories.length > 0;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasSubcategories) {
            setIsOpen(!isOpen);
        }
    };

    const categoryContent = (
        <CategoryRow $level={level}>
            <IconWrapper onClick={handleToggle}>
                {hasSubcategories ? (
                    isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                ) : (
                    <div style={{ width: '16px' }} /> // Placeholder for alignment
                )}
            </IconWrapper>
            <CategoryItemStyled
                $isSelected={isSelected}
                onClick={() => onSelectCategory(category)}
            >
                {category.icon && <DynamicIcon name={category.icon} size={16} />}
                <span>{category.name}</span>
            </CategoryItemStyled>
        </CategoryRow>
    );

    const renderSubCategories = () => (
        <div>
            {category.subCategories?.map(subCat => (
                <RenderCategory
                    key={subCat.id}
                    category={subCat}
                    selectedCategory={selectedCategory}
                    onSelectCategory={onSelectCategory}
                    level={level + 1}
                />
            ))}
        </div>
    );

    const finalContent = (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            {categoryContent}
            <CollapsibleContent>
                {renderSubCategories()}
            </CollapsibleContent>
        </Collapsible>
    );

    if (level === 0) {
        return <SortableCategoryItem id={category.id}>{finalContent}</SortableCategoryItem>;
    }

    return finalContent;
};


interface CategoryListProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, onSelectCategory, searchQuery, onSearchChange, onDragEnd }) => {
  const categoryIds = useMemo(() => categories.map(c => c.id), [categories]);

  return (
    <CategoryListContainer>
      <div>
        <h2>Kategorie</h2>
        <Input
          type="search"
          placeholder="Hledat..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="mb-4"
        />
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={categoryIds} strategy={verticalListSortingStrategy}>
          <ScrollableCategoryArea>
            {categories.map((category) => (
              <RenderCategory
                  key={category.id}
                  category={category}
                  selectedCategory={selectedCategory}
                  onSelectCategory={onSelectCategory}
                  level={0}
              />
            ))}
          </ScrollableCategoryArea>
        </SortableContext>
      </DndContext>
    </CategoryListContainer>
  );
};

export default CategoryList;

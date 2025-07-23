import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { GripVertical } from 'lucide-react';

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  color: ${({ theme }) => theme.colors.neutral.gray400};
  &:active {
    cursor: grabbing;
  }
`;

const SortableItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  outline: none;
`;

interface SortableCategoryItemProps {
  id: string;
  children: React.ReactNode;
}

export const SortableCategoryItem: React.FC<SortableCategoryItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <SortableItemContainer ref={setNodeRef} style={style}>
      <DragHandle {...attributes} {...listeners}>
        <GripVertical size={16} />
      </DragHandle>
      {children}
    </SortableItemContainer>
  );
};

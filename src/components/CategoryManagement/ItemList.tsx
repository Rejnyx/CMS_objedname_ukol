import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import type { Item, Category, ItemStatus } from '../../types.ts';
import { Button } from '@/components/ui/button';
import DynamicIcon from '../common/DynamicIcon.tsx';
import { ImageIcon, Trash2 } from 'lucide-react';

const getStatusInfo = (status: ItemStatus) => {
  switch (status) {
    case 'AVAILABLE':
      return { text: 'Dostupné', color: '#28a745' };
    case 'SOLD_OUT':
      return { text: 'Vyprodáno', color: '#ffc107' };
    case 'HIDDEN':
      return { text: 'Skryté', color: '#6c757d' };
    default:
      return { text: 'Neznámý', color: '#6c757d' };
  }
};

const ItemCard = styled.div<{ status: ItemStatus }>`
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr auto;
  align-items: start;
  gap: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border: 1px solid ${({ theme }) => theme.colors.neutral.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  transition: box-shadow 0.2s ease-in-out, opacity 0.2s ease-in-out;

  ${({ status }) => (status === 'HIDDEN' || status === 'SOLD_OUT') && css`
    opacity: 0.6;
  `}

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.xs};
`;

const MainInfoColumn = styled(Column)`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
`;

const DetailsColumn = styled(Column)``;

const MetaColumn = styled(Column)`
  align-items: flex-end;
`;

const ImagePlaceholder = styled.div`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.neutral.gray100};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.neutral.gray400};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral.gray500};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.error.light};
    color: ${({ theme }) => theme.colors.error.dark};
  }
`;

const ItemDetails = styled.div`
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.neutral.gray600};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Tag = styled.span<{ color?: string }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  background-color: ${({ color, theme }) => color || theme.colors.neutral.gray200};
  color: ${({ color, theme }) => (color ? theme.colors.neutral.white : theme.colors.neutral.gray800)};
`;

const StatusIndicator = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ color }) => color};

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
  }
`;

const AllergenInfo = styled.div`
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.neutral.gray500};
    margin-top: ${({ theme }) => theme.spacing.md};
`;

const DetailList = styled.ul`
    list-style-type: none;
    padding-left: ${({ theme }) => theme.spacing.md};
    margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const DetailListItem = styled.li`
    &::before {
        content: '•';
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
    }
`;

const SubCategoryHeader = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutral.gray800};
  margin-top: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.gray300};

  &:first-of-type {
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const ItemName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutral.gray800};
  margin: 0;
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutral.gray900};
`;

const BulkActionsToolbar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ItemsGridContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

interface ItemListProps {
  category: Category | null;
  onEditItem: (item: Item) => void;
  onAddItem: () => void;
  onDeleteItem: (itemId: string) => void;
  selectedItems: string[];
  onToggleSelectItem: (itemId: string) => void;
  onDeleteSelected: () => void;
  onBulkChangeStatus: (status: ItemStatus) => void;
}

const ItemList: React.FC<ItemListProps> = ({ category, onEditItem, onAddItem, onDeleteItem, selectedItems, onToggleSelectItem, onDeleteSelected, onBulkChangeStatus }) => {
  const collectedItems = useMemo(() => {
    const items: { categoryName: string; items: Item[] }[] = [];
    
    function collect(cat: Category) {
      if (cat.items.length > 0) {
        items.push({ categoryName: cat.name, items: cat.items });
      }
      cat.subCategories?.forEach(collect);
    }

    if (category && (category.subCategories?.length || 0) > 0) {
      collect(category);
    }
    
    return items;
  }, [category]);

  if (!category) {
    return <div>Prosím, vyberte kategorii.</div>;
  }

const renderItem = (item: Item) => {
    const statusInfo = getStatusInfo(item.status);
    return (
    <ItemCard key={item.id} status={item.status}>
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
        <input 
          type="checkbox" 
          checked={selectedItems.includes(item.id)}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelectItem(item.id);
          }}
        />
      </div>

      <MainInfoColumn onClick={() => onEditItem(item)}>
        <ImagePlaceholder>
          {item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : <ImageIcon size={24} />}
        </ImagePlaceholder>
        <Column>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item.icon && <DynamicIcon name={item.icon} size={20} />}
            <ItemName>{item.name}</ItemName>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#5f6368' }}>{item.description}</p>
          <TagsContainer>
            {item.tags?.map(tag => <Tag key={tag.id} color={tag.color}>{tag.name}</Tag>)}
          </TagsContainer>
        </Column>
      </MainInfoColumn>

      <DetailsColumn>
        <ItemDetails>
            {item.baseIngredients.length > 0 && (
              <>
                <strong>Složení:</strong>
                <TagsContainer style={{ marginTop: '4px' }}>
                  {item.baseIngredients.map(ing => <Tag key={ing}>{ing}</Tag>)}
                </TagsContainer>
              </>
            )}
        </ItemDetails>
        <ItemDetails>
            {item.variants.length > 0 && (
                <>
                    <strong>Varianty:</strong>
                    <DetailList>
                        {item.variants.map(variant => <DetailListItem key={variant.id}>{variant.name} (+{variant.price} Kč)</DetailListItem>)}
                    </DetailList>
                </>
            )}
        </ItemDetails>
      </DetailsColumn>

      <MetaColumn>
        <ItemName style={{ marginBottom: '8px' }}>{item.basePrice} Kč</ItemName>
        <StatusIndicator color={statusInfo.color}>{statusInfo.text}</StatusIndicator>
        {(item.allergenIds?.length || 0) > 0 && (
            <AllergenInfo>
                Alergeny: {item.allergenIds?.join(', ')}
            </AllergenInfo>
        )}
      </MetaColumn>

      <ActionsContainer>
        <DeleteButton onClick={(e) => {
          e.stopPropagation();
          onDeleteItem(item.id);
        }}>
          <Trash2 size={20} />
        </DeleteButton>
      </ActionsContainer>
    </ItemCard>
  );
  }

  const hasSubcategories = (category.subCategories?.length || 0) > 0;

  const handleBulkStatusChange = () => {
    const newStatus = prompt("Zadejte nový stav pro vybrané položky:\n'AVAILABLE', 'SOLD_OUT', nebo 'HIDDEN'", "AVAILABLE");
    if (newStatus === 'AVAILABLE' || newStatus === 'SOLD_OUT' || newStatus === 'HIDDEN') {
      onBulkChangeStatus(newStatus);
    } else if (newStatus !== null) {
      alert("Neplatný stav. Prosím zadejte jednu z možností: 'AVAILABLE', 'SOLD_OUT', 'HIDDEN'.");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <PageTitle>Položky v {category.name}</PageTitle>
        <div>
          <Button onClick={onAddItem}>Přidat položku</Button>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <BulkActionsToolbar>
            <span>Vybráno {selectedItems.length} položek:</span>
            <Button onClick={handleBulkStatusChange} variant="outline" size="sm">Změnit stav</Button>
            <Button onClick={onDeleteSelected} variant="destructive" size="sm">Smazat vybrané</Button>
        </BulkActionsToolbar>
      )}
      
      {hasSubcategories ? (
        collectedItems.length > 0 ? (
          collectedItems.map(group => (
            <div key={group.categoryName}>
              <SubCategoryHeader>{group.categoryName}</SubCategoryHeader>
              <ItemsGridContainer>
                {group.items.map(renderItem)}
              </ItemsGridContainer>
            </div>
          ))
        ) : (
          <p>V této kategorii a jejích podkategoriích nejsou žádné položky.</p>
        )
      ) : (
        category.items.length > 0 ? (
          <ItemsGridContainer>
            {category.items.map(renderItem)}
          </ItemsGridContainer>
        ) : (
          <p>V této kategorii nejsou žádné položky.</p>
        )
      )}
    </div>
  );
};

export default ItemList;

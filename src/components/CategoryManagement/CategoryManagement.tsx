import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { mockData, globalSideDishes as initialGlobalSideDishes, globalAllergens, globalTags, globalManagedIngredients } from '../../data/mockData.ts';
import { arrayMove } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';
import CategoryList from './CategoryList.tsx';
import ItemList from './ItemList.tsx';
import ItemEditor from './ItemEditor.tsx';
import type { Category, Item, SideDish, ItemStatus } from '../../types.ts';
import Breadcrumb from './Breadcrumb.tsx';

const ManagementContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  height: calc(100vh - 120px); // Adjust based on layout
  padding: ${({ theme }) => theme.spacing.lg};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const EditorContainer = styled.div`
    border-left: 1px solid ${({ theme }) => theme.colors.neutral.gray200};
    padding-left: ${({ theme }) => theme.spacing.lg};
    height: 100%;
    overflow-y: auto;
`;

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(mockData);
  const [globalSideDishes, setGlobalSideDishes] = useState<SideDish[]>(initialGlobalSideDishes);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
    setSelectedItems([]);
  }, []);

  const handleSelectItem = useCallback((item: Item) => {
    setSelectedItem(item);
  }, []);

  const handleSaveItem = (updatedItem: Item) => {
    const newCategories = categories.map(cat => {
        const updateItems = (items: Item[]): Item[] => {
            return items.map(item => item.id === updatedItem.id ? updatedItem : item);
        };

        const updateSubCategories = (subCats?: Category[]): Category[] | undefined => {
            if (!subCats) return undefined;
            return subCats.map(subCat => ({
                ...subCat,
                items: updateItems(subCat.items),
                subCategories: updateSubCategories(subCat.subCategories)
            }));
        };

        return {
            ...cat,
            items: updateItems(cat.items),
            subCategories: updateSubCategories(cat.subCategories)
        };
    });

    setCategories(newCategories);
    setSelectedItem(updatedItem);
  };

  const handleAddNewSideDish = (name: string, price: number): SideDish => {
    const newSideDish: SideDish = {
      id: `sd-new-${Date.now()}`,
      name,
      price,
    };
    setGlobalSideDishes(prev => [...prev, newSideDish]);
    return newSideDish;
  };

  const handleToggleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  // Placeholder handlers for ItemList props
  const handleAddItem = () => {
    console.log('Add new item to category:', selectedCategory?.id);
    // In a real app, this would open a creation form
  };

  const handleDeleteItem = (itemId: string) => {
    console.log('Delete item:', itemId);
    // In a real app, this would remove the item from the state
  };

  const handleDeleteSelected = () => {
    console.log('Delete selected items:', selectedItems);
    setSelectedItems([]);
  };

  const handleBulkChangeStatus = (status: ItemStatus) => {
    console.log('Change status of items:', selectedItems, 'to', status);
    setSelectedItems([]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  
  const getCategoryPath = (categoryId: string, rootCategories: Category[]): Category[] => {
    for (const category of rootCategories) {
        if (category.id === categoryId) {
            return [category];
        }
        if (category.subCategories) {
            const path = getCategoryPath(categoryId, category.subCategories);
            if (path.length > 0) {
                return [category, ...path];
            }
        }
    }
    return [];
  };

  const breadcrumbPath = selectedCategory ? getCategoryPath(selectedCategory.id, categories) : [];

  return (
    <ManagementContainer>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onDragEnd={handleDragEnd}
      />
      <MainContent>
        <Breadcrumb path={breadcrumbPath} onNavigate={handleSelectCategory} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flexGrow: 1, overflow: 'hidden' }}>
            <ItemList
              category={selectedCategory}
              onEditItem={handleSelectItem}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              selectedItems={selectedItems}
              onToggleSelectItem={handleToggleSelectItem}
              onDeleteSelected={handleDeleteSelected}
              onBulkChangeStatus={handleBulkChangeStatus}
            />
            {selectedItem && (
              <EditorContainer>
                <ItemEditor
                  item={selectedItem}
                  onSave={handleSaveItem}
                  onClose={() => setSelectedItem(null)}
                  globalSideDishes={globalSideDishes}
                  globalAllergens={globalAllergens}
                  globalTags={globalTags}
                  globalManagedIngredients={globalManagedIngredients}
                  onAddNewSideDish={handleAddNewSideDish}
                  categoryType={selectedCategory?.type}
                />
              </EditorContainer>
            )}
        </div>
      </MainContent>
    </ManagementContainer>
  );
};

export default CategoryManagement;

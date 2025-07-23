import React, { useEffect, useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import type { Item, SideDish, Ingredient, Allergen, Variant, ItemStatus, QuickTag, ManagedIngredient } from '../../types';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import DynamicIcon from '../common/DynamicIcon.tsx';

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const EditorContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 500px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.paper};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

const EditorHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.gray200};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;

  h2 {
    margin: 0;
    flex-grow: 1;
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral.gray600};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.gray100};
    color: ${({ theme }) => theme.colors.neutral.gray900};
  }
`;

const EditorContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const EditorFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.gray200};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.default};
  flex-shrink: 0;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.gray200};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

interface TabButtonProps {
  isActive: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  background: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme, isActive }) => isActive ? theme.colors.primary.main : theme.colors.neutral.gray600};
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;

  ${({ isActive, theme }) => isActive && css`
    border-bottom-color: ${theme.colors.primary.main};
  `}

  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.neutral.gray700};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.neutral.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-sizing: border-box;
`;

const SectionTitle = styled.h4`
    margin-top: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.neutral.gray800};
`;

const Row = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    align-items: center;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    cursor: pointer;
`;

const StatusRadioContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StatusRadioLabel = styled.label<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme, isActive }) => isActive ? theme.colors.primary.main : theme.colors.neutral.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${({ theme, isActive }) => isActive ? theme.colors.primary.light : theme.colors.neutral.white};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// Props
interface ItemEditorProps {
  item: Item;
  onClose: () => void;
  onSave: (item: Item) => void;
  globalSideDishes: SideDish[];
  onAddNewSideDish: (name: string, price: number) => SideDish;
  globalAllergens: Allergen[];
  globalManagedIngredients: ManagedIngredient[];
  globalTags: QuickTag[];
  categoryType?: 'main_course' | 'pizza' | 'dessert' | 'drink' | 'starter' | 'soup';
}

type Tab = 'basic' | 'pricing' | 'addons' | 'assignment';

// Component
const ItemEditor: React.FC<ItemEditorProps> = ({ item, onClose, onSave, globalSideDishes, onAddNewSideDish, globalAllergens, globalManagedIngredients, globalTags, categoryType }) => {
  const [editedItem, setEditedItem] = useState<Item>(item);
  const [activeTab, setActiveTab] = useState<Tab>('basic');

  const hasChanges = useMemo(() => JSON.stringify(item) !== JSON.stringify(editedItem), [item, editedItem]);

  useEffect(() => {
    setEditedItem(item);
  }, [item]);

  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm('Máte neuložené změny. Opravdu si přejete zavřít editor?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({ ...prev, [name]: name === 'basePrice' ? Number(value) : value }));
  };

  const handleStatusChange = (status: ItemStatus) => {
    setEditedItem(prev => ({ ...prev, status }));
  };

  const handleBaseIngredientChange = (index: number, value: string) => {
    const newBaseIngredients = [...editedItem.baseIngredients];
    newBaseIngredients[index] = value;
    setEditedItem(prev => ({ ...prev, baseIngredients: newBaseIngredients }));
  };

  const addBaseIngredient = () => {
    setEditedItem(prev => ({ ...prev, baseIngredients: [...prev.baseIngredients, ''] }));
  };

  const removeBaseIngredient = (index: number) => {
    const newBaseIngredients = editedItem.baseIngredients.filter((_, i) => i !== index);
    setEditedItem(prev => ({ ...prev, baseIngredients: newBaseIngredients }));
  };

  const handleTagToggle = (tagId: string) => {
    const currentTags = editedItem.tags || [];
    const tag = globalTags.find(t => t.id === tagId);
    if (!tag) return;

    const isSelected = currentTags.some(t => t.id === tagId);
    const newTags = isSelected
      ? currentTags.filter(t => t.id !== tagId)
      : [...currentTags, tag];
    
    setEditedItem(prev => ({ ...prev, tags: newTags }));
  };

  const handleQuickAddSideDish = () => {
    const name = prompt("Zadejte název nové přílohy:");
    if (!name) return;

    const priceString = prompt(`Zadejte cenu pro "${name}":`);
    if (priceString === null) return;

    const price = Number(priceString);
    if (isNaN(price) || price < 0) {
      alert("Zadejte platnou, nezápornou cenu.");
      return;
    }

    const newSideDish = onAddNewSideDish(name, price);
    handleSideDishToggle(newSideDish.id);
  };

  const handleManagedIngredientToggle = (ingredientId: string) => {
    const current = editedItem.managedIngredientIds || [];
    const newIds = current.includes(ingredientId)
      ? current.filter(id => id !== ingredientId)
      : [...current, ingredientId];
    setEditedItem(prev => ({ ...prev, managedIngredientIds: newIds }));
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = [...editedItem.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setEditedItem(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setEditedItem(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { id: `ing-new-${Date.now()}`, name: '', price: 0 }]
    }));
  };

  const removeIngredient = (index: number) => {
    const newIngredients = editedItem.ingredients.filter((_, i) => i !== index);
    setEditedItem(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = [...editedItem.variants];
    const numValue = typeof value === 'string' && field === 'price' ? Number(value) : value;
    newVariants[index] = { ...newVariants[index], [field]: numValue };
    setEditedItem(prev => ({ ...prev, variants: newVariants }));
  };

  const addVariant = () => {
    setEditedItem(prev => ({
      ...prev,
      variants: [...prev.variants, { id: `var-new-${Date.now()}`, name: '', price: 0 }]
    }));
  };

  const removeVariant = (index: number) => {
    const newVariants = editedItem.variants.filter((_, i) => i !== index);
    setEditedItem(prev => ({ ...prev, variants: newVariants }));
  };

  // Handlers for checkboxes
  const handleSideDishToggle = (sideDishId: string) => {
    const current = editedItem.sideDishIds || [];
    const newIds = current.includes(sideDishId) ? current.filter(id => id !== sideDishId) : [...current, sideDishId];
    setEditedItem(prev => ({ ...prev, sideDishIds: newIds }));
  };

  const handleAllergenToggle = (allergenId: number) => {
    const current = editedItem.allergenIds || [];
    const newIds = current.includes(allergenId) ? current.filter(id => id !== allergenId) : [...current, allergenId];
    setEditedItem(prev => ({ ...prev, allergenIds: newIds }));
  };

  const handleSave = () => {
    onSave(editedItem);
  };

  return (
    <>
      <Overlay onClick={handleClose} />
      <EditorContainer>
        <EditorHeader>
          {editedItem.icon && <DynamicIcon name={editedItem.icon} size={24} />}
          <h2>{item.name}</h2>
          <CloseButton onClick={handleClose}><X size={24} /></CloseButton>
        </EditorHeader>

        <EditorContent>
          <TabContainer>
            <TabButton isActive={activeTab === 'basic'} onClick={() => setActiveTab('basic')}>Základní info</TabButton>
            <TabButton isActive={activeTab === 'pricing'} onClick={() => setActiveTab('pricing')}>Cenotvorba</TabButton>
            <TabButton isActive={activeTab === 'addons'} onClick={() => setActiveTab('addons')}>Doplňky</TabButton>
            <TabButton isActive={activeTab === 'assignment'} onClick={() => setActiveTab('assignment')}>Přiřazení</TabButton>
          </TabContainer>

          {activeTab === 'basic' && (
            <>
              <FormGroup>
                <Label htmlFor="name">Název položky</Label>
                <Input type="text" id="name" name="name" value={editedItem.name} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Popis</Label>
                <Input as="textarea" rows={4} id="description" name="description" value={editedItem.description} onChange={handleInputChange} />
              </FormGroup>
              
              <FormGroup>
                <Label>Stav</Label>
                <StatusRadioContainer>
                  <StatusRadioLabel isActive={editedItem.status === 'AVAILABLE'}>
                    <input type="radio" name="status" value="AVAILABLE" checked={editedItem.status === 'AVAILABLE'} onChange={() => handleStatusChange('AVAILABLE')} style={{ display: 'none' }} />
                    Dostupné
                  </StatusRadioLabel>
                  <StatusRadioLabel isActive={editedItem.status === 'SOLD_OUT'}>
                    <input type="radio" name="status" value="SOLD_OUT" checked={editedItem.status === 'SOLD_OUT'} onChange={() => handleStatusChange('SOLD_OUT')} style={{ display: 'none' }} />
                    Vyprodáno
                  </StatusRadioLabel>
                  <StatusRadioLabel isActive={editedItem.status === 'HIDDEN'}>
                    <input type="radio" name="status" value="HIDDEN" checked={editedItem.status === 'HIDDEN'} onChange={() => handleStatusChange('HIDDEN')} style={{ display: 'none' }} />
                    Skryté
                  </StatusRadioLabel>
                </StatusRadioContainer>
              </FormGroup>

              <SectionTitle>Základní ingredience</SectionTitle>
              {editedItem.baseIngredients.map((ing, index) => (
                <Row key={index}>
                  <Input type="text" placeholder="Název ingredience" value={ing} onChange={e => handleBaseIngredientChange(index, e.target.value)} />
                  <Button onClick={() => removeBaseIngredient(index)} variant="destructive" size="icon"><X size={16} /></Button>
                </Row>
              ))}
              <Button onClick={addBaseIngredient} variant="secondary" style={{ width: '100%', marginTop: '8px' }}><Plus size={16} style={{ marginRight: '4px' }} /> Přidat ingredienci</Button>

              <SectionTitle>Skladově spravované ingredience</SectionTitle>
              <TagContainer>
                {globalManagedIngredients.map(ing => (
                  <CheckboxLabel key={ing.id}>
                    <input type="checkbox" checked={editedItem.managedIngredientIds?.includes(ing.id)} onChange={() => handleManagedIngredientToggle(ing.id)} />
                    {ing.name}
                  </CheckboxLabel>
                ))}
              </TagContainer>
            </>
          )}

          {activeTab === 'pricing' && (
            <>
              <FormGroup>
                  <Label htmlFor="basePrice">Základní cena (Kč)</Label>
                  <Input type="number" id="basePrice" name="basePrice" value={editedItem.basePrice} onChange={handleInputChange} disabled={editedItem.variants.length > 0} />
                  {editedItem.variants.length > 0 && (
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Cena je definována variantami níže.</p>
                  )}
              </FormGroup>

              <SectionTitle>Varianty / Velikosti</SectionTitle>
              {editedItem.variants.map((variant, index) => (
                <Row key={variant.id}>
                  <Input type="text" placeholder="Název (např. 45cm)" value={variant.name} onChange={e => handleVariantChange(index, 'name', e.target.value)} />
                  <Input type="number" placeholder="Cena (Kč)" value={variant.price} onChange={e => handleVariantChange(index, 'price', e.target.value)} style={{ width: '120px' }} />
                  <Button onClick={() => removeVariant(index)} variant="destructive" size="icon"><X size={16} /></Button>
                </Row>
              ))}
              <Button onClick={addVariant} variant="secondary" style={{ width: '100%', marginTop: '8px' }}>+ Přidat variantu</Button>
            </>
          )}

          {activeTab === 'addons' && (
            <>
              <SectionTitle>Volitelné ingredience (specifické pro tuto položku)</SectionTitle>
              {editedItem.ingredients.map((ing, index) => (
                <Row key={ing.id}>
                  <Input type="text" placeholder="Název ingredience" value={ing.name} onChange={e => handleIngredientChange(index, 'name', e.target.value)} />
                  <Input type="number" placeholder="Cena" value={ing.price} onChange={e => handleIngredientChange(index, 'price', Number(e.target.value))} style={{ width: '100px' }} />
                  <Button onClick={() => removeIngredient(index)} variant="destructive" size="icon"><X size={16} /></Button>
                </Row>
              ))}
              <Button onClick={addIngredient} variant="secondary" style={{ width: '100%', marginTop: '8px' }}>+ Přidat ingredienci</Button>

              {categoryType === 'main_course' && (
                <FormGroup style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <SectionTitle>Přílohy a doplňky (z globálního seznamu)</SectionTitle>
                    <Button onClick={handleQuickAddSideDish} variant="outline" size="sm"><Plus size={16} style={{ marginRight: '4px' }} /> Vytvořit novou</Button>
                  </div>
                  {globalSideDishes.map(sideDish => (
                    <CheckboxLabel key={sideDish.id}>
                      <input type="checkbox" checked={editedItem.sideDishIds?.includes(sideDish.id)} onChange={() => handleSideDishToggle(sideDish.id)} />
                      {sideDish.name} (+{sideDish.price} Kč)
                    </CheckboxLabel>
                  ))}
                </FormGroup>
              )}
            </>
          )}

          {activeTab === 'assignment' && (
            <>
              <FormGroup>
                <SectionTitle>Rychlé štítky</SectionTitle>
                <TagContainer>
                  {globalTags.map(tag => (
                    <CheckboxLabel key={tag.id}>
                      <input type="checkbox" checked={editedItem.tags?.some(t => t.id === tag.id)} onChange={() => handleTagToggle(tag.id)} />
                      {tag.name}
                    </CheckboxLabel>
                  ))}
                </TagContainer>
              </FormGroup>
              <FormGroup>
                <SectionTitle>Alergeny</SectionTitle>
                {globalAllergens.map(allergen => (
                  <CheckboxLabel key={allergen.id}>
                    <input type="checkbox" checked={editedItem.allergenIds?.includes(allergen.id)} onChange={() => handleAllergenToggle(allergen.id)} />
                    {allergen.id} - {allergen.name}
                  </CheckboxLabel>
                ))}
              </FormGroup>
            </>
          )}
        </EditorContent>

        <EditorFooter>
          <Button onClick={handleClose} variant="secondary" style={{ flex: 1 }}>Zrušit</Button>
          <Button onClick={handleSave} style={{ flex: 2 }} disabled={!hasChanges}>Uložit změny</Button>
        </EditorFooter>
      </EditorContainer>
    </>
  );
};

export default ItemEditor;

export interface Ingredient {
  id: string;
  name: string;
  price: number;
}

export interface Variant {
  id: string;
  name: string;
  price: number;
}

export type ItemStatus = 'AVAILABLE' | 'SOLD_OUT' | 'HIDDEN';
export type IngredientStatus = 'IN_STOCK' | 'OUT_OF_STOCK';

export interface ManagedIngredient {
  id: string;
  name: string;
  status: IngredientStatus;
}

export interface QuickTag {
  id: string;
  name: string;
  color: string; // e.g., 'blue', '#4A90E2'
}

export interface Item {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  status: ItemStatus;
  icon?: string;
  imageUrl?: string;
  variants: Variant[];
  baseIngredients: string[]; // Nespravované základní ingredience (text)
  managedIngredientIds?: string[]; // IDčka spravovaných ingrediencí
  ingredients: Ingredient[]; // Lokální, volitelné ingredience specifické pro toto jídlo
  sideDishIds?: string[]; // Pole IDček odkazující na globální přílohy
  allergenIds?: number[]; // Pole číselných kódů alergenů
  tags?: QuickTag[]; // Štítky jako "Nové", "Pálivé", "Veganské"
}

export interface SideDish {
  id: string;
  name: string;
  price: number;
}

export interface Allergen {
  id: number;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  items: Item[];
  subCategories?: Category[];
  type?: 'main_course' | 'pizza' | 'dessert' | 'drink' | 'starter' | 'soup';
}

import { Difficulty, Category, CuisineType, DietType } from '../enums';
import { Recipe } from './Recipe';

export type RecipeHistoryRequest = Partial<Recipe> & {
  userName?: string[];
  name?: string;
  image?: string;
  totalTime?: number;
  servings?: number;
  dietType?: DietType | undefined;
  cuisineType?: CuisineType | undefined;
  difficulty?: Difficulty | undefined;
  category?: Category | undefined;
  page: number; // Número da página
  size: number; // Tamanho da página
};
  
export type RecipeHistoryItem = Partial<Recipe> & {
  id: number;
  userName?: string; // Derivado de user.name
  name: string;
  image?: string;
  totalTime: number; // Manter como número para consistência
  servings: number;
  dietType?: DietType | undefined;
  cuisineType?: CuisineType | undefined;
  difficulty?: Difficulty | undefined;
  category?: Category | undefined;
};
  
  export type RecipeHistoryResponse = {
    content: RecipeHistoryItem[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
  };
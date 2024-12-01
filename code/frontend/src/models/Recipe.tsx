import { UserProfile } from "@/models/User";
import { Ingredient } from "./Ingredient";
import { Method } from "./Method";
import { Category, CuisineType, DietType, Difficulty } from "@/enums";
import { Review } from "./Review";

export type Recipe = {
    id: number;
    name: string;
    user: UserProfile;
    ingredients: Ingredient[];
    methods: Method[];
    image: string;
    preparationTime: number;
    cookTime: number;
    totalTime: number;
    servings: number;
    dietType: DietType | null;
    cuisineType: CuisineType | null;
    difficulty: Difficulty | null;
    category: Category | null;
    reviews: Review[];
    deleted: boolean;
}
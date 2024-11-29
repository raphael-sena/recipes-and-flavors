import { UserProfile } from "@/models/User";
import { Ingredient } from "./Ingredient";
import { Method } from "./Method";
import { Category, CuisineType, DietType, Difficulty } from "@/enums";
import { Review } from "./Review";

export type Recipe = {
    id: number;
    name: string;
    user: UserProfile;
    ingredients: Ingredient;
    methods: Method;
    image: string;
    preparationTime: number;
    cookTime: number;
    totalTime: number;
    servings: number;
    dietType: DietType;
    cuisineType: CuisineType;
    difficulty: Difficulty;
    category: Category;
    reviews: Review;
    deleted: boolean;
}
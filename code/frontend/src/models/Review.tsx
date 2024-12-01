import { UserProfile } from "@/models/User"
import { Recipe } from "./Recipe";

export type Review = {
    id: number;
    user: UserProfile;
    rating: number;
    comment: string;
    recipe: Recipe;
}
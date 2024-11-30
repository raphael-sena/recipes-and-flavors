import { UserProfile } from "@/models/User"
import { Recipe } from "./Recipe";

export type Review = {
    user: UserProfile;
    rating: number;
    comment: string;
    receipe: Recipe;
}
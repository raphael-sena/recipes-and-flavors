import { UnitType } from "@/enums";

export type Ingredient = {
    name: string;
    quantity: number;
    unit: UnitType;
};
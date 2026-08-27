import { BankRateData } from "@/types/bank";
import data from "./banks.json";

export const rbiRepoRate = data.rbiRepoRate;
export const lastUpdated = data.lastUpdated;

export const banksData: Record<string, BankRateData> = data.banksData as Record<string, any>;

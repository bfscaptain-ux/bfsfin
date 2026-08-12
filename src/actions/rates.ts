"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const filePath = path.join(process.cwd(), "src/data/liveRates.json");

export async function getLiveRates() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read liveRates.json", error);
    return null;
  }
}

export async function updateLiveRates(newData: any) {
  try {
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2), "utf-8");
    revalidatePath("/rates");
    revalidatePath("/admin/rates");
    return { success: true };
  } catch (error) {
    console.error("Failed to write liveRates.json", error);
    return { success: false, error: "Failed to update rates" };
  }
}

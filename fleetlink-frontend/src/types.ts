// src/types.ts
export interface Vehicle {
  _id: string;
  name: string;
  capacityKg: number;
  tyres: number;
  estimatedRideDurationHours?: number; // only comes in search results
}

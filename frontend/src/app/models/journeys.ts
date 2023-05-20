export interface Journey {
  id: number;
  title?: string;
  subtitle?: string;
  location?: string;
  coordinates: [number, number];
  startDate?: string | Date;
  endDate?: string | Date;
  price?: number;
  autonomy?: AutonomyStatus;
  images?: string[];
  optionalImage?: string;
  description?: string;
  recreation?: string;
  hosting?: string;
  transport?: string;
  groupSize?: number;
  companions?: number;
  updatedAt?: string | Date;
  createdAt?: string | Date;
}

export enum AutonomyStatus {
  GOOD = 'GOOD',
  RELATIVE = 'RELATIVE',
  IMPORTANT = 'IMPORTANT',
}

export type SuggestedLocationResult = {
  formatted: string;
  geometry: { lat: number; lng: number };
};
export interface SuggestedLocations {
  results: SuggestedLocationResult[];
}

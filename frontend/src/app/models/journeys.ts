export interface Journey {
  id?: number;
  title?: string;
  subtitle?: string;
  location?: string;
  coordinates?: [number, number];
  startDate?: string | Date;
  endDate?: string | Date;
  price?: number;
  autonomy?: AutonomyStatus;
  imageUrl?: string;
  optionalUrl?: string;
  description?: string;
  recreation?: string;
  hosting?: string;
  transport?: string;
  groupSize?: [number, number];
  createdAt?: string | Date;
}

export enum AutonomyStatus {
  GOOD = 'GOOD',
  RELATIVE = 'RELATIVE',
  IMPORTANT = 'IMPORTANT',
}

export interface Journey {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  coordinates: [number, number];
  startDate?: Date;
  endDate?: Date;
  price?: number;
  autonomy?: [boolean, boolean, boolean];
  imageURL: string;
  optionalURL?: string;
  descriptionText: string;
  recreationText: string;
  hostingText: string;
  transportText: string;
  groupeSize: [number, number];
  createdAt: Date;
}

export const Amenities = ['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'] as const;
export type Amenity = typeof Amenities[number];

export function isAmenityArray(amenities: string[]): Amenity[] | undefined {
  return amenities
    .every((amenity: string) => Amenities.find((el) => el === amenity)) ? (amenities as Amenity[]) : undefined;
}

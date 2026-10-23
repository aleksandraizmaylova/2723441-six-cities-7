export const AccommodationTypes = ['apartment', 'house', 'room', 'hotel'] as const;
export type AccommodationType = typeof AccommodationTypes[number];

// export function areAccommodationTypes(types: string[]): AccommodationType[] | undefined {
//   return types.every(isAccommodationType) ? (types as AccommodationType[]) : undefined;
// }

export function isAccommodationType(type: string): AccommodationType | undefined {
  return AccommodationTypes.find((el) => el === type);
}

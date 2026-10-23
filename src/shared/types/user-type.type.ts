export const UserTypes = ['Pro', 'Standard'] as const;
export type UserType = typeof UserTypes[number];

export function isUserType(type: string): UserType | undefined {
  return UserTypes.find((el) => el === type);
}

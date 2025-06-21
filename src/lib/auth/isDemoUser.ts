export function isDemoUser(userId: string) {
  return userId === process.env.NEXT_PUBLIC_DEMO_USER_ID;
}

export const newUserToken = (userId: number) => ({
  userId,
  can: ["token:validateAccount"],
  exp: Date.now() + 43200000, // 12h
});

export const resetPasswordToken = (userId: number) => ({
  userId,
  can: ["token:updatePassword"],
  exp: Date.now() + 3600000, // 1h
});

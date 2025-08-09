import bcrypt from 'bcrypt';

export const comparePassword = async (
  dbPassword: string,
  incomingPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(dbPassword, incomingPassword);
};

export const hashPassword = async (
  incomingPassword: string
): Promise<string> => {
  return await bcrypt.hash(incomingPassword, 10);
};

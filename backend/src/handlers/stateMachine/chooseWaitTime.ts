export const main = async (): Promise<{ timeInSeconds: number }> => ({
  timeInSeconds: Math.ceil(Math.random() * 60),
});

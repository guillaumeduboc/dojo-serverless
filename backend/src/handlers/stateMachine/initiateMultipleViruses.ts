const maxViruses = 4;
const minViruses = 2;

export const main = async (): Promise<{ virusTaskId: number }[]> => {
  const numberOfViruses =
    minViruses + Math.floor(Math.random() * (maxViruses - minViruses + 1));
  const data = Array.from({ length: numberOfViruses }, (_, i) => ({
    virusTaskId: i + 1,
  }));
  return data;
};

import { isMatch } from 'date-fns';

export const parseDate = (date: unknown, startDate = false) => {
  if (date === undefined) return;

  const isValidDate = isMatch(date as string, 'yyyy-MM-dd');

  if (!isValidDate) return;

  const postfix = startDate ? 'T00:00:00.000Z' : 'T12:00:00.000Z';

  return date + postfix;
};

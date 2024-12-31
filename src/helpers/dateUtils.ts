import { isMatch } from 'date-fns';

export const parseDate = (date: unknown, startDate = false) => {
  const isValidDate = isMatch(date as string, 'yyyy-MM-dd');

  if (!isValidDate) return;

  const postfix = startDate ? 'T00:00:00.000Z' : 'T23:59:59.999Z';

  return date + postfix;
};

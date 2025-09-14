import moment from 'moment-timezone';
import type { Timezone } from '@/04_types/_common/timezone';
import useTimezoneStore from '@/05_stores/_common/timezone-store';

export const getDateTimezone = (
  date?: Date | string,
  type: 'date' | 'date_time' = 'date_time',
  timezone?: Timezone,
): string => {
  if (!date) return '';

  const {
    timezone: userTz,
    date_format,
    time_format,
  } = useTimezoneStore.getState();

  const defaultFormats = {
    date: 'MMM D, YYYY',
    time: 'hh:mm:ss A',
  };

  const dateFormat = date_format || defaultFormats.date;
  const timeFormat = time_format || defaultFormats.time;

  const format =
    type === 'date_time' ? `${dateFormat} ${timeFormat}` : dateFormat;

  const resolvedTimezone = timezone || userTz || moment.tz.guess();

  return moment(date).tz(resolvedTimezone).format(format);
};

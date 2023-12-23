import moment from 'moment';

const getTimeDifferenceAndDay = (timestamp: string) => {
  const timeZoneMoment = moment(timestamp);
  const currentMoment = moment();
  const mins = currentMoment.diff(timeZoneMoment, 'minutes');
  const minsDiffAbs = Math.abs(mins);

  const dateToday = currentMoment.get('D');
  const dateTimezone = timeZoneMoment.get('D');

  let dayLabel = '';
  if (dateTimezone < dateToday) {
    dayLabel = 'Yesterday';
  } else if (dateTimezone > dateToday) {
    dayLabel = 'Tomorrow';
  } else {
    dayLabel = 'Today';
  }

  const hours = `${Math.floor(minsDiffAbs / 60)}`.padStart(2, '0');
  const minutes = `${Math.floor(minsDiffAbs % 60)}`.padStart(2, '0');

  let timeDifference = '';

  if (mins < 0) {
    timeDifference = `+${hours}:${minutes}`;
  } else {
    timeDifference = `-${hours}:${minutes}`;
  }

  return {
    dayLabel,
    timeDifference,
  };
};

export {getTimeDifferenceAndDay};

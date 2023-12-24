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

const computeNewTime = (
  params: {
    hours: string;
    minutes: string;
    seconds: string;
  },
  intervalInSeconds = 1,
) => {
  const {hours, minutes, seconds} = params;
  let totalSeconds = +(+hours * 3600 + +minutes * 60 + +seconds);
  totalSeconds -= intervalInSeconds;

  if (totalSeconds <= 0) {
    return {hours: '00', minutes: '00', seconds: '00'};
  }

  const newHours = Math.floor(totalSeconds / 3600);
  const newMinutes = Math.floor((totalSeconds % 3600) / 60);
  const newSeconds = Math.floor(totalSeconds % 60);

  return {
    hours: newHours.toString().padStart(2, '0'),
    minutes: newMinutes.toString().padStart(2, '0'),
    seconds: newSeconds.toString().padStart(2, '0'),
  };
};

export {getTimeDifferenceAndDay, computeNewTime};

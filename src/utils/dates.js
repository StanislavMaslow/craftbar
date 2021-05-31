export const formatDate = date => {
  const dates = date.split(' ');
  return `${dates[0]}`;
};

export const formatHour = date => {
  const dates = date.split(' ');
  const hours = dates[1].slice(0, 5);
  let time = hours.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [hours];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
};

export const dummy = '';

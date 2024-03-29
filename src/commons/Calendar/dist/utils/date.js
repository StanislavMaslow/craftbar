

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
/* eslint-disable import/prefer-default-export, no-restricted-globals */


export function isValidDate(date) {
  // eslint-disable-next-line
  return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
}

function leapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

// eslint-disable-next-line
export function getNumberOfDaysInMonth(monthIndex, year) {
  // eslint-disable-next-line
  switch (monthIndex) {
    case 0:
      return 31;
    case 1:
      return leapYear(year) ? 29 : 28;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
  }
}

export function getMonthNames(locale) {
  switch (locale) {
    case 'es':
      return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    case 'en':
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    case 'fr':
      return ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    default:
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
}

function getWeekdayNames(locale) {
  switch (locale) {
    case 'es':
      return ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];
    case 'en':
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    case 'fr':
      return ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    default:
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
}

export function getDayNames(locale, firstDayMonday) {
  const days = getWeekdayNames(locale);
  if (firstDayMonday) {
    const sunday = days.shift();
    days.push(sunday);
    return days;
  }

  return days;
}
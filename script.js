function reverseStr(receivedString) {
  return receivedString.split('').reverse().join('');
}

function isPalindrome(receivedDate) {
  let reverse = reverseStr(receivedDate);
  return receivedDate === reverse;
}

function dateVariations(date) {
  let dateStr = convertDateToStr(date);
  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + date.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function convertDateToStr(date) {
  let dateStr = { day: '', month: '', year: '' };
  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function checkPalindrome(date) {
  let variations = dateVariations(date);

  for (let i of variations) {
    if (isPalindrome(i)) {
      return true;
    }
  }
  return false;
}

function isLeap(year) {
  if (year % 400) {
    return true;
  }
  if (year % 100) {
    return false;
  }
  if (year % 4) {
    return true;
  }
}

function nextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;
  let mapMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month == 2) {
    if (isLeap(year)) {
      if (day > 29) {
        day = 1;
        month += 1;
      }
    } else if (day > 28) {
      day = 1;
      month += 1;
    }
  } else if (day > mapMonth[month - 1]) {
    day = 1;
    month += 1;
  }

  if (month > 12) {
    month = 1;
    year += 1;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function prevDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;
  let mapMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day < 1) {
    if (month == 3) {
      if (isLeap(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = mapMonth[month - 2];
    }
    month -= 1;
  }
  if (month < 1) {
    month = 12;
    year -= 1;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function countPrevDays(date) {
  let count = 0;
  let prevdate = prevDate(date);
  while (true) {
    count += 1;
    if (checkPalindrome(prevdate)) {
      return [count, prevdate];
    }
    prevdate = prevDate(prevdate);
  }
}

function countDays(date) {
  let counter = 0;
  let nextdate = nextDate(date);
  while (true) {
    counter += 1;
    if (checkPalindrome(nextdate)) {
      return [counter, nextdate];
    }
    nextdate = nextDate(nextdate);
  }
}

const date1 = document.querySelector('.date-input');
const button = document.querySelector('.check');
const display = document.querySelector('.display');

button.addEventListener('click', () => {
  // console.log('date1');
  if (date1.value != '') {
    let dateArray = date1.value.split('-');

    let date = {
      day: Number(dateArray[2]),
      month: Number(dateArray[1]),
      year: Number(dateArray[0]),
    };
    if (checkPalindrome(date)) {
      display.innerText = 'Yay!!! your birthday is palindrome';
    } else {
      let [counter, nextdate] = countDays(date);
      let [count, prevdate] = countPrevDays(date);
      nextdate = convertDateToStr(nextdate);
      prevdate = convertDateToStr(prevdate);

      display.innerText = `Sorry the next date ${nextdate.day}-${nextdate.month}-${nextdate.year} is ${counter} days away from your birthday. The previous date ${prevdate.day}-${prevdate.month}-${prevdate.year} was ${count} days before your birthday. `;
    }
  } else {
    display.innerText = 'Please Enter a date';
  }
});

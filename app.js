var birthDate = document.querySelector('#birthdate');
var button = document.querySelector('#button');
var output = document.querySelector('#output');
var gif = document.querySelector('#calculating-gif');

function reverseString(str) {
  return str.split('').reverse().join('');
}

function checkStringPalindrome(str) {
  var reversedString = reverseString(str);
  return str === reversedString;
}

function getDateAsString(date) {
  var dateInStr = {
    day: '',
    month: '',
    year: ''
  };

  if (date.day < 10) {
    dateInStr.day = '0' + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = '0' + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return dateInStr;
}

function getDateInAllFormats(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
  var dateFormatList = getDateInAllFormats(date);
  var palindromeList = [];

  for (var i = 0; i < dateFormatList.length; i++) {
    var result = checkStringPalindrome(dateFormatList[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

function checkLeapYear(year) {

  if (year % 400 === 0)
    return true;

  if (year % 100 === 0)
    return false;

  if (year % 4 === 0)
    return true;

  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (checkLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getNextPalindromeDate(date) {

  var nextDate = getNextDate(date);
  var checkDate = 0;

  while (1) {
    checkDate++;
    var dateStr = getDateAsString(nextDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [checkDate, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (checkLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getPreviousPalindromeDate(date) {

  var previousDate = getPreviousDate(date);
  var checkDate = 0;

  while (1) {
    checkDate++;
    var dateStr = getDateAsString(previousDate);
    var dateList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < dateList.length; i++) {
      if (dateList[i]) {
        return [checkDate, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
}

function checkPalindrome() {

  var bdayString = birthDate.value;

  if (bdayString !== '') {
    gif.style.display = 'block';
    output.style.display = 'none';
    setTimeout(function () {
      gif.style.display = 'none';
      output.style.display = 'block';
    }, 4000);

    var date = bdayString.split('-');
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy)
    };

    var dateStr = getDateAsString(date);
    var list = checkPalindromeForAllDateFormats(dateStr);
    var isPalindrome = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPalindrome = true;
        break;
      }
    }

    if (!isPalindrome) {
      const [checkDate1, nextDate] = getNextPalindromeDate(date);
      const [checkDate2, prevDate] = getPreviousPalindromeDate(date);

      var day = '';
      if (checkDate2 < checkDate1) {
        day = (checkDate2 == 1) ? 'day' : 'days';
        output.innerText = ` Oops! Your birthday is not Palindrome. The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${checkDate2} ${day}`;
      } else {
        day = (checkDate1 == 1) ? 'day' : 'days';
        output.innerText = `Oops! Your birthday is not Palindrome. The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${checkDate1} ${day}.`;
      }

    } else {
      output.innerText = "Congratulations! Your birthday is palindrome!";
    }
  } else {
    output.innerText = "Please enter your birthdate";
  }
}

button.addEventListener('click', checkPalindrome);
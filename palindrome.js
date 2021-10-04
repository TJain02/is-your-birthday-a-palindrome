function stringReverse(str) {
    var stringSplit = str.split("");
    var reversedString = stringSplit.reverse();
    var joinedString = reversedString.join("");
    return joinedString;
}

function checkPalindrome(str) {
    var reverse = stringReverse(str);
    if (str === reverse) {
        return 1;
    }
    return 0;

}

function dateToString(date) {
    var dateString = {
        day: "",
        month: "",
        year: ""
    };
    if (date.day < 10) {
        dateString.day = "0" + date.day;
    } else dateString.day = date.day.toString();


    if (date.month < 10) {
        dateString.month = "0" + date.month;
    } else dateString.month = date.month.toString();

    dateString.year = date.year.toString();
    return dateString;
}

function allDateFormats(date) {
    var dateStr = dateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
    var dates = allDateFormats(date);

    for (var i = 0; i < dates.length; i++) {
        var result = "false";
        var x = checkPalindrome(dates[i]);
        if (x === 1) {
            result = "true"
            break;
        }
    }
    return result;
}

function isLeapyear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapyear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {

                day = 29;
                month++;
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
function getPreviousDate(date)
{
    var day = date.day-1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
        if (isLeapyear(year)) {
            if (day < 1) {
                day = 29;
                month--;
            }
        } else {
            if (day < 1) {

                day = 28;
                month--;
            }
        }

    } else {
        if (day < 1 ) {
            day = daysInMonth[month - 1];
            month--;
        }

    }
    if (month < 1 ) {
        month = 12;
        year--;

    }
    return {
        day: day,
        month: month,
        year: year
    }


}

function nextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllFormats(nextDate);
        if (isPalindrome === "true") {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

function previuousPalindromeDate(date) {
    var ctr = 0;
    var previousDate = getPreviousDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllFormats(previousDate);
        if (isPalindrome === "true") {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [ctr, previousDate];

}



var inputDate = document.querySelector("#input-date");
var inputBtn = document.querySelector("#input-btn");
var outputHere = document.querySelector("#output");

function clickHandler()
{
    var bdayStr = inputDate.value;
    if (bdayStr !== "")
    {
        var listOfDate = bdayStr.split("-");
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        
        };
        var isItpalindrome = checkPalindromeForAllFormats(date);
        if (isItpalindrome === "true")
        {
            outputHere.innerText = "Your Birthday is a palindrome";
        }else {
            var  answer = [ctr, nextDate] = nextPalindromeDate(date);
            outputHere.innerText = " The next palindrome date is " + nextDate.day +  "-" + nextDate.month + "-" + nextDate.year + ". You missed it by " + ctr + " days!" ;
        }
    }
}

inputBtn.addEventListener("click" , clickHandler);
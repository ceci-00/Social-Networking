const addDateSuffix = date => {
    let dateStr = date.toString();

    // Get the last character of the date string
    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === '1' && dateStr !== '11') {
        dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }

    return dateStr;
};

const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

module.exports = date => {
    const dateObj = new Date(date);

    const formattedMonth = months[dateObj.getMonth()];
    const dayOfMonth = addDateSuffix(dateObj.getDate());
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours();
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
    const amPm = dateObj.getHours() >= 12 ? 'pm' : 'am';

    return `${formattedMonth} ${dayOfMonth}, ${year} at ${hours}:${minutes} ${amPm}`;
};
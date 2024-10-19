import dayjs from 'dayjs';

export  function formatDate (date){
    return dayjs(date).format('DD/MM/YYYY');
}


export function formatDateWithMonth(date) {
    return dayjs(date).format('DD MMM YYYY');
}

export function calculateDuration(fromDate, toDate) {
    const start = dayjs(fromDate);
    const end = dayjs(toDate);
    
    // Calculate the difference in months
    const monthsDiff = end.diff(start, 'month');
    const daysDiff = end.diff(start, 'day');
    
    // Check if the difference is less than 1 month
    if (monthsDiff === 0) {
        return `${daysDiff} days`;
    } else {
        return `${monthsDiff} month${monthsDiff > 1 ? 's' : ''}`;
    }
}
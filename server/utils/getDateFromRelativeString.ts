import moment from 'moment';

export const getDateFromRelativeString = (relativeString: string): Date => {
    // Regular expressions for different time formats
    const dayRegex = /(\d+)\s*days? ago/;
    const hourRegex = /(\d+)h ago/;
    const minuteRegex = /(\d+)m ago/;

    // Check and parse different formats
    if (dayRegex.test(relativeString)) {
        const match = dayRegex.exec(relativeString);
        const days = match ? parseInt(match[1]) : 0;
        return moment().subtract(days, 'days').toDate();
    } else if (hourRegex.test(relativeString)) {
        const match = hourRegex.exec(relativeString);
        const hours = match ? parseInt(match[1]) : 0;
        return moment().subtract(hours, 'hours').toDate();
    } else if (minuteRegex.test(relativeString)) {
        const match = minuteRegex.exec(relativeString);
        const minutes = match ? parseInt(match[1]) : 0;
        return moment().subtract(minutes, 'minutes').toDate();
    }
    return null
}

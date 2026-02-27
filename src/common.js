// format publishDate into a human readable string; handle number (timestamp), string, and invalid values
export const formattedPublishDate = ((publishDate) => {
    if (publishDate === undefined || publishDate === null) return '';
    // If it's already a Date object
    if (publishDate instanceof Date) {
        if (isNaN(publishDate)) return '';
        return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(publishDate);
    }
    // If it's a number (timestamp)
    const maybeNumber = typeof publishDate === 'number' ? publishDate : Number(publishDate);
    let dateObj = new Date(maybeNumber);
    if (!isNaN(dateObj.getTime())) {
        return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(dateObj);
    }
    // Fallback: try parsing as ISO string
    dateObj = new Date(String(publishDate));
    if (!isNaN(dateObj.getTime())) {
        return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(dateObj);
    }
    // If nothing works, return the original value as-is
    return String(publishDate);
});
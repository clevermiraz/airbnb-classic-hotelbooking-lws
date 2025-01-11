export const formatDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    return formattedDate;
};

export const formatDateWithMonth = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options);
    return formattedDate;
};
export const formatDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    return formattedDate;
};

export const getDayOfWeek = (dateString: string): string => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getDay();
    return daysOfWeek[dayOfWeekIndex];
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};


export const getDateDetails = (dateString:string) => {
    const dateObj = new Date(dateString);
    
    const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timezone = dateObj.toLocaleTimeString([], { timeZoneName: 'short' }).split(' ')[2];
    
    return { time, timezone };
  };
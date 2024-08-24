const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getMonth = (date: Date) => {
   return monthNames[date.getMonth()];
};

export {
   monthNames,
   getMonth,
};
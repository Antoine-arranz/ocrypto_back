const getArrayOfTimestamp = (startDate, stopDate): Array<Date> => {
    const currentDate = new Date(startDate);
    let timestamp: any = [];
    while (currentDate < stopDate) {
      timestamp.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return timestamp;
  }

  export default getArrayOfTimestamp
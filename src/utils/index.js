// comparing 3-day range before and after the current date with birthdate
export const isWithinBirthdayRange = (birthDate) => {
  const today = new Date();

  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 3
  );
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 3
  );

  const startMonthDay = {
    month: startDate.getMonth() + 1,
    day: startDate.getDate(),
  };

  const endMonthDay = {
    month: endDate.getMonth() + 1,
    day: endDate.getDate(),
  };

  const birthdayMonthDay = {
    month: birthDate.getMonth() + 1,
    day: birthDate.getDate(),
  };

  const startRangeDate = new Date(
    today.getFullYear(),
    startMonthDay.month - 1,
    startMonthDay.day
  );
  const endRangeDate = new Date(
    today.getFullYear(),
    endMonthDay.month - 1,
    endMonthDay.day
  );
  const birthdayDate = new Date(
    today.getFullYear(),
    birthdayMonthDay.month - 1,
    birthdayMonthDay.day
  );

  if (endRangeDate < startRangeDate) {
    endRangeDate.setFullYear(endRangeDate.getFullYear() + 1);
    if (birthdayDate < startRangeDate) {
      birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
    }
  }

  return birthdayDate >= startRangeDate && birthdayDate <= endRangeDate;
};

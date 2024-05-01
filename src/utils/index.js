// comparing today's date with birthdate
export const isToday = (birthDate) => {
  const today = new Date();
  return (
    birthDate.getDate() === today.getDate() &&
    birthDate.getMonth() === today.getMonth()
  );
};

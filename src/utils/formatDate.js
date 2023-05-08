function convertDate(dateStr) {
  const date = new Date(dateStr);

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;

  return formattedDate;
}

export default convertDate;

export const formatDate = (date) => {
  const newDate = new Date(date).toISOString().substr(0, 10);
  return newDate;
};

export const formatToenUs = (date) => {
  const newDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return newDate;
};

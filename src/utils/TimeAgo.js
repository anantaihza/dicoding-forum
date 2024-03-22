const getTimeAgo = (createAt) => {
  /**
   * example:
   * From -> 2021-06-21T07:00:00.000Z
   * To -> Mon Jun 21 2021 14:00:00 GMT+0700 (Western Indonesia Time)
   */
  const createdTime = new Date(createAt);
  const currentTime = new Date();
  const timeDifference = currentTime - createdTime;

  // 1 second = 1000 miliseconds
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? '1 tahun yang lalu' : `${years} tahun yang lalu`;
  }

  if (days > 0) {
    return days === 1 ? '1 hari lalu' : `${days} hari lalu`;
  }

  if (hours > 0) {
    return hours === 1 ? '1 jam yang lalu' : `${hours} jam yang lalu`;
  }

  if (minutes > 0) {
    return minutes === 1 ? '1 menit yang lalu' : `${minutes} menit yang lalu`;
  }

  return seconds < 10 ? 'Baru saja' : `${seconds} detik yang lalu`;
};

export default getTimeAgo;

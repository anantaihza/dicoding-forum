const getInitials = (name) =>
  name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('');

export default getInitials;

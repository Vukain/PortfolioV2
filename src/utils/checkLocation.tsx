export const checkLocation = () => {
  const [, location] = window.location.href.split('#');
  return location;
};

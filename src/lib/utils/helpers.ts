export const greeting = () => {
  const time = new Date().getHours();

  if (time < 12) {
    return "Good Morning";
  } else if (time < 18) {
    return "Good Afternoon";
  } else if (time >= 18) {
    return "Good Evening";
  }
};

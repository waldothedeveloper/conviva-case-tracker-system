import React from "react";

export const CheckInternetConnection = () => {
  const [isOnline, setIsOnline] = React.useState(true);

  // eslint-disable-next-line
  React.useEffect(() => {
    if (navigator.onLine) {
      setIsOnline(true);
    }

    if (!navigator.onLine) {
      setIsOnline(false);
    }
  });

  return isOnline;
};

import React from "react";

export const CheckInternetConnection = () => {
  const [isOnline, setIsOnline] = React.useState(true);

  React.useEffect(() => {
    if (navigator.onLine) {
      setIsOnline(true);
    }

    if (!navigator.onLine) {
      setIsOnline(false);
    }
    //eslint-disable-next-line
  });

  return isOnline;
};

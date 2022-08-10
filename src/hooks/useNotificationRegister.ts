import { useEffect, useState } from 'react';

const useMount = (func: Function) => useEffect(() => func(), []);

export const useNotificationRegister = () => {
  const [expoToken, setExpoToken] = useState<string>();

  useMount(() => {
    // registerForPushNotifications().then((expoToken) => setExpoToken(expoToken));
  });

  return { expoToken };
};

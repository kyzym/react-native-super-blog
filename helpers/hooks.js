import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboardListener = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardShown;
};

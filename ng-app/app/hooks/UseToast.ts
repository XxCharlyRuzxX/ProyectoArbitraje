import Toast from "react-native-toast-message";

export function UseToast() {
  const success = (message: string, title = "Éxito") => {
    Toast.show({
      type: "success",
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 3000,
    });
  };

  const error = (message: string, title = "Error") => {
    Toast.show({
      type: "error",
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 3000,
    });
  };

  const info = (message: string, title = "Aviso") => {
    Toast.show({
      type: "info",
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 3000,
    });
  };

  return { success, error, info };
}
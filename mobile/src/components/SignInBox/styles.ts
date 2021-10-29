import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    // o método getBottomSpace() ajuda a ajustar a posição inferior de acordo com o dispositivo
    paddingBottom: getBottomSpace() + 32,
  },
});

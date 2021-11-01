import React from "react";

import { View } from "react-native";
import { useAuth } from "../../../hooks/auth";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SignInBox() {
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container} onTouchEnd={signIn}>
      <Button
        title="ENTRAR COM GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        // onPress no Button substituído por onTouchEnd na View 
        // porque algumas vezes o toque no botão não é registrado
        // onPress={signIn}
        isLoading={isSigningIn}
      />
    </View>
  );
}

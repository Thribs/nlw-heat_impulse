import React from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { useAuth } from "../../../hooks/auth";

import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";
import { SendMessageForm } from "../../components/SendMessageForm";
import { SignInBox } from "../../components/SignInBox";

import { styles } from "./styles";

export function Home() {
  const { user } = useAuth();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Header />
        <Text>Hello, world! 👋</Text>
        <MessageList />
        {user ? <SendMessageForm /> : <SignInBox />}
      </View>
    </KeyboardAvoidingView>
  );
}

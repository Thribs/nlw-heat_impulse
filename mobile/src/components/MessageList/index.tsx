import React, { useEffect, useState } from "react";

import { ScrollView } from "react-native";
import { api } from "../../services/api";
import { io } from "socket.io-client";

import { Message, MessageProps } from "../Message";

import { styles } from "./styles";

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on("new_message", (newMessage) => {
  messagesQueue.push(newMessage);
  console.log(newMessage);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function fetchLast3Messages() {
      const last3MessagesResponse = await api.get<MessageProps[]>(
        "/messages/last3"
      );
      setCurrentMessages(last3MessagesResponse.data);
    }

    fetchLast3Messages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((prevState) => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ]);
        messagesQueue.shift();
      }
    }, 3000);
    return () => clearInterval(timer);
  });

  const messageData = {
    id: "1",
    text: "Teste",
    user: {
      name: "",
      avatar_url: "https://github.com/Thribs.png",
      login: "Thribs",
    },
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
}

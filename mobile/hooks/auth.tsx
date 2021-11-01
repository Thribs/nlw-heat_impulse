import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthSessions from "expo-auth-session";
import { api } from "../src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
};

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthResponse = {
  token: string;
  user: User;
};

type Auth = {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const CLIENT_ID = "c653a062c1c6d40a9006";
  const SCOPE = "read:user";
  const STORAGE_USER = "@mobile:user";
  const STORAGE_TOKEN = "@mobile:token";

  async function signIn() {
    try {
      setIsSigningIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const auth = (await AuthSessions.startAsync({ authUrl })) as Auth;
      

      if (auth.type === "success" && auth.params.code !== "access_denied") {        
        
        const authResponse = await api.post("/authenticate", {
          code: auth.params.code,
        });
        
        
        const { user, token } = authResponse.data as AuthResponse;
        

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        await AsyncStorage.setItem(STORAGE_USER, JSON.stringify(user));
        await AsyncStorage.setItem(STORAGE_TOKEN, token);

        
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningIn(false);
    }

    setIsSigningIn(false);
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_USER);
    await AsyncStorage.removeItem(STORAGE_TOKEN);
  }

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem(STORAGE_USER);
      const storageToken = await AsyncStorage.getItem(STORAGE_TOKEN);

      if (storageUser && storageToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
      }

      setIsSigningIn(false);
    }

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isSigningIn,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };

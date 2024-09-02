import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      } else {
        setAuthState({
          token: null,
          authenticated: false,
        });
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/api/v1/auth/login`, {
        email,
        password,
      });

      setAuthState({
        token: result.data.data.accessToken,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.data.accessToken}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.data.accessToken);
      return result;
    } catch (err) {
      console.log(err);
      return { error: true, message: (err as any).response.data.error.message };
    }
  };

  const logout = async () => {
    //delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    //Update HTTP Headers
    axios.defaults.headers.common["Authorization"] = "";

    //Reset auth state
    setAuthState({
      token: null,
      authenticated: false,
    });
  };
  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code: string): string | null {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<string | null>(null);

  useEffect(() => {
    axios
      .post("http://localhost:8080/auth/login", { code })
      .then(({ data: { accessToken, refreshToken, expiresIn } }) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setExpiresIn(expiresIn);

        window.history.pushState({}, "", "/");
      })
      .catch((err) => (window.location.href = "/"));
  }, [code]);
  useEffect(() => {}, [refreshToken, expiresIn]);

  return accessToken;
}

import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code: string): string | null {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

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
  useEffect(() => {
    if (refreshToken && expiresIn) {
      // Using setInterval here to only call this api call if the expiresIn value is just about to run out, so we're not doing it when we do not need to.
      const interval = setInterval(() => {
        axios
          .post("http://localhost:8080/auth/refresh", { refreshToken })
          .then(({ data: { accessToken, expiresIn } }) => {
            setAccessToken(accessToken);
            setExpiresIn(expiresIn);
          })
          .catch((err) => {
            window.location.href = "/";
            console.error(err);
          });
      }, (expiresIn - 60) * 1000);
      return () => clearInterval(interval);
    }
  }, [refreshToken, expiresIn]);

  return accessToken;
}

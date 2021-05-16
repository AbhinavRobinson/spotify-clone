import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = (code: string) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [ExpiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, "", "/");
      })
      .catch(() => {
        window.location.href = "/";
      });
  });

  return accessToken;
};

export default useAuth;

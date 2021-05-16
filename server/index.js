import express from "express";
const SpotifyApi = require("spotify-web-api-node");

const app = express();

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyApi({
    redirectUri: "http://localhost:3000",
    clientId: "e71b0f5c95c54cb88d31c1ffb7190022",
    clientSecret: "",
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

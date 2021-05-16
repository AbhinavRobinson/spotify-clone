const express = require("express");
const cors = require("cors");
const SpotifyApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
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
    .catch((res) => {
      console.log(res);
      res.sendStatus(400);
    });
});

app.listen(3001);

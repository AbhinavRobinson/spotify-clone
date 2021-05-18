import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Dashboard: React.FC<{ code: string }> = ({ code }) => {
  const accessToken: string = useAuth(code) || "";
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{ artist: string; title: string; uri: string; albumUrl: string }>
  >([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      if (!res.body.tracks) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if ((image.height ?? 1) < (smallest.height ?? 0)) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [search, accessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></Form.Control>
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults[0] && searchResults[0].title}
      </div>
      <div className="">Bottom</div>
    </Container>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

export interface SearchProps {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}

const Dashboard: React.FC<{ code: string }> = ({ code }) => {
  const accessToken: string = useAuth(code) || "";
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Array<SearchProps>>([]);
  const [playingTrack, setPlayingTrack] = useState<string[]>();

  const chooseTrack = (track: SearchProps) => {
    setPlayingTrack([track.artist, track.title, track.uri, track.albumUrl]);
    setSearch("");
  };

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
    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
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
    return () => {
      cancel = true;
    };
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
        {searchResults.map((track) => {
          return (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          );
        })}
      </div>
      <div className="">
        <Player token={accessToken} uris={playingTrack} />
      </div>
    </Container>
  );
};

export default Dashboard;

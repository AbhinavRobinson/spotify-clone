import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

interface PlayerProps {
  token: string;
  uris?: string[];
}

const Player: React.FC<PlayerProps> = ({ token, uris }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [uris]);

  if (!token) return null;
  return (
    <SpotifyPlayer
      {...{ token, play }}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      showSaveIcon
      uris={uris ? [uris[2]] : []}
    />
  );
};

export default Player;

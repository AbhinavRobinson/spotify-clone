import React from "react";
import { SearchProps } from "./Dashboard";

interface TrackProps {
  track: SearchProps;
  chooseTrack: (track: SearchProps) => void;
}

const TrackSearchResult: React.FC<TrackProps> = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        style={{ height: "64px", width: "64px", marginRight: "20px" }}
        alt={track.title}
      />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
};

export default TrackSearchResult;

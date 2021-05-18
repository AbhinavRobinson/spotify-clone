import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Dashboard: React.FC<{ code: string }> = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></Form.Control>
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        Songs
      </div>
      <div className="">Bottom</div>
    </Container>
  );
};

export default Dashboard;

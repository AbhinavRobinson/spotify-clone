import React from "react";
import useAuth from "./useAuth";

const Dashboard: React.FC<{ code: string }> = ({ code }) => {
  const accessToken = useAuth(code);
  return <div>{accessToken}</div>;
};

export default Dashboard;

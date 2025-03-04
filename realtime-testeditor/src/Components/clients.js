import React from "react";

export const Clients = ({ initial, username }) => {
  return (
    <div className="user-info">
      <div className="profile">
        <h1>{initial}</h1>
      </div>
      <div className="profile-right">
        <h1>{username}</h1>
      </div>
    </div>
  );
};

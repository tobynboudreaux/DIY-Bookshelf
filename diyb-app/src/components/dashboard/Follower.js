import React from "react";
import { Link } from "react-router-dom";

const Follower = ({ follower, users }) => {
  const { user } = follower;

  const followers = users.filter((u) => u._id === user);

  const followerInfo = followers[0];
  console.log(followers, followerInfo, users, follower);
  return (
    <div>
      {followerInfo && (
        <Link to={`/profile/${followerInfo._id}`}>{followerInfo.name}</Link>
      )}{" "}
    </div>
  );
};

export default Follower;

import React from "react";
import { Link } from "react-router-dom";

const Followee = ({ followee, users }) => {
  const { user } = followee;

  const followees = users.filter((u) => u._id === user);

  const followeeInfo = followees[0];
  console.log(followees, followeeInfo, users, followee);
  return (
    <div>
      {followeeInfo && (
        <Link to={`/profile/${followeeInfo._id}`}>{followeeInfo.name}</Link>
      )}
    </div>
  );
};

export default Followee;

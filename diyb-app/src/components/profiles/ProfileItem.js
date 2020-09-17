import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    occupation,
    location,
    skills,
  },
}) => {
  return (
    <div key={_id} className="profile bg-light">
      <img src={avatar} alt="" className="profile-top-img"></img>
      <div>
        <h2>{name}</h2>
        <p className="my-1">{status && <span>Status: {status}</span>}</p>
        <p className="my-1">
          {occupation && <span>Occupation: {occupation}</span>}
        </p>
        <p className="my-1">{location && <span>Location: {location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          <i className="fas fa-arrow-alt-circle-right"></i> View Profile
        </Link>
      </div>
      <ul>
        Skills:
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {};

export default ProfileItem;

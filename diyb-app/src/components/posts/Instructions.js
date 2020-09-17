import React, { Fragment } from "react";

const Instructions = ({ instructions, display, toggleDisplay }) => {
  return (
    <div>
      {instructions && (
        <Fragment>
          <button
            className="btn btn-primary"
            onClick={(e) => toggleDisplay(!display)}
          >
            Toggle
          </button>
          {instructions.map((inst) => (
            <div key={inst._id}>
              {display && (
                <div className="panel">
                  {instructions.indexOf(inst) + 1}
                  <li className="my-1">{inst.title}</li>
                  <li className="my-1">
                    {" "}
                    <img src={inst.image} alt="" className="inst-image" />{" "}
                  </li>
                  <li className="my-1">{inst.directions}</li>
                </div>
              )}
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default Instructions;

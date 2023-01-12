import React from "react";
import "./user.css";

export default function UserDiv(props) {
  return (
    <div className="user-div">
      <span>{props.initial}</span>
      <div>
        <p>{props.name} </p>
        <p className="email">{props.email}</p>
      </div>
    </div>
  );
}

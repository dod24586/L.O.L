import React from "react";
import "./style.css";
import { Link } from "@reach/router";
const Card = props => {
  return (
    <div
      className="card"
      style={{
        backgroundSize: "contain"
      }}
    >
      <div className="face face1">
        <div className="content">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${props.data.id}_0.jpg`}
            alt={props.data.id}
            style={{ width: "219px" }}
          />{" "}
        </div>
        <div className="face face2">
          <div style={{ display: "block", textAlign: "center" }}>
            <h2>
              <Link to={`/champ/${props.data.id}`}>{props.data.name}</Link>
            </h2>
            <h6>{props.data.title}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

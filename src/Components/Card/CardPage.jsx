import React, { Component } from "react";
import Card from "./Card";
import "./style.css";
import Axios from "axios";
class CardPage extends Component {
  state = { data: [], version: "" };
  UNSAFE_componentWillMount() {
    Axios.get("https://ddragon.leagueoflegends.com/api/versions.json").then(
      y => {
        Axios.get(
          `https://ddragon.leagueoflegends.com/cdn/${y.data[0]}/data/en_US/champion.json`
        ).then(x => {
          this.setState({ data: x.data.data, version: x.data[0] });
        });
      }
    );
  }
  componentDidMount() {}
  render() {
    return (
      <div className="CardPageBody">
        <div className="Cardcontainer">
          {Object.keys(this.state.data).map((x, index) => (
            <Card key={this.state.data[x].key} data={this.state.data[x]} />
          ))}
        </div>
      </div>
    );
  }
}

export default CardPage;

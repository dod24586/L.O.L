import React, { Component } from "react";
import Axios from "axios";
import "./style.css";
import ReactHtmlParser from "react-html-parser";
class Champ extends Component {
  state = {
    data: {},
    display: false,
    clicked: "",
    index: 0,
    passive: false,
    version: ""
  };
  UNSAFE_componentWillMount() {
    Axios.get("https://ddragon.leagueoflegends.com/api/versions.json").then(y =>
      Axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${y.data[0]}/data/en_US/champion/${this.props.Champ}.json
     `
      ).then(x => {
        this.setState({
          data: x.data.data[this.props.Champ],
          version: y.data[0]
        });
      })
    );
  }
  render() {
    console.log(this.state);
    if (this.state.data.id)
      return (
        <div>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              {this.state.data.skins.map(x =>
                x.num === 0 ? null : (
                  <li
                    key={x.num}
                    data-target="#carouselExampleIndicators"
                    data-slide-to={x.num}
                  ></li>
                )
              )}
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.props.Champ}_0.jpg`}
                  className="d-block w-100 resp"
                  alt="..."
                />
              </div>
              {this.state.data.skins &&
                this.state.data.skins.map(x =>
                  x.num === 0 ? null : (
                    <div key={x.num} className="carousel-item">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.props.Champ}_${x.num}.jpg`}
                        className="d-block w-100 resp"
                        alt={x.name}
                      />
                    </div>
                  )
                )}
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          <div className="container">
            <h3>Lore</h3>
            <p>{this.state.data.lore}</p>
            <h3>Tags</h3>
            {this.state.data.tags.map((x, index) => (
              <span key={index}>
                {x} {this.state.data.tags.length - 1 > index ? "," : null}{" "}
              </span>
            ))}
            <h3>Partype</h3>
            <p>{this.state.data.partype}</p>
            <h3>Spells</h3>
            {this.state.data.spells.map((x, index) => (
              <React.Fragment key={x.id}>
                <div
                  style={{
                    justifyContent: "flex-start",
                    display: "inline-flex",
                    marginLeft: index === 0 ? "0" : "1vw",

                    outline:
                      this.state.clicked === x.id ? "2px solid red" : null
                  }}
                >
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/spell/${x.id}.png`}
                    alt={x.name}
                    className="ImageHover"
                    id={x.id}
                    onClick={x => {
                      this.state.clicked !== x.target.id
                        ? this.setState({
                            display: true,
                            clicked: x.target.id,
                            index
                          })
                        : this.state.display
                        ? this.setState({
                            clicked: "",
                            display: false
                          })
                        : this.setState({
                            clicked: x.target.id,
                            index,
                            display: true
                          });
                    }}
                  />
                  <br />
                  <p style={{ margin: "auto 10px", display: "none" }}>
                    {x.name}
                  </p>
                </div>
              </React.Fragment>
            ))}
            {this.state.display ? (
              <div style={{ outline: "2px solid red", padding: "40px" }}>
                <p
                  style={{
                    margin: "auto 0",
                    fontFamily: "monospace",
                    fontSize: "large",
                    fontWeight: "800"
                  }}
                >
                  {ReactHtmlParser(
                    this.state.data.spells[this.state.index].description
                  )}
                </p>
              </div>
            ) : null}
            <h3>Passive</h3>
            {this.state.data.passive ? (
              <React.Fragment>
                <div
                  style={{
                    justifyContent: "flex-start",
                    display: "inline-flex",
                    outline: this.state.passive ? "2px solid red" : null
                  }}
                >
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${this.state.version}/img/passive/${this.state.data.passive.image.full}`}
                    alt={this.state.data.passive.name}
                    className="ImageHover"
                    onClick={x =>
                      this.setState({ passive: !this.state.passive })
                    }
                  />
                </div>
                {this.state.passive ? (
                  <div style={{ outline: "2px solid red", padding: "40px" }}>
                    <p
                      style={{
                        margin: "auto 0",
                        fontFamily: "monospace",
                        fontSize: "large",
                        fontWeight: "800"
                      }}
                    >
                      {ReactHtmlParser(this.state.data.passive.description)}
                    </p>
                  </div>
                ) : null}
              </React.Fragment>
            ) : null}{" "}
            <h3>Win with {this.state.data.name}</h3>
            <ol>
              {this.state.data.allytips.map((x, index) => (
                <li key={index}>{x}</li>
              ))}
            </ol>
            <h3>Win Aganist {this.state.data.name}</h3>
            <ol>
              {this.state.data.enemytips.map((x, index) => (
                <li key={index}>{x}</li>
              ))}
            </ol>
          </div>
        </div>
      );
    return <div></div>;
  }
}

export default Champ;
/*
        <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>*/
/*
<h4>Starting item</h4>
        <br />
        {this.state.data.id &&
          this.state.data.recommended[8].blocks[0].items.map(x => (
            <div>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/${x.id}.png`}
                alt={x.id}
              />
              <h5>{x.id}</h5>
            </div>
          ))}
*/

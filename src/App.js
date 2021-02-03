import React from "react";
import "./App.css";
import emoji from "react-easy-emoji";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countries: [], rightAnswer: false, init: false };
  }
  componentDidMount() {
    const where = encodeURIComponent(
      JSON.stringify({
        continent: {
          __type: "Pointer",
          className: "Continent",
          objectId: "28HX8qDZHw",
        },
      })
    );
    fetch(
      `https://parseapi.back4app.com/classes/Country?order=name&keys=name,emoji&where=${where}`,
      {
        headers: {
          "X-Parse-Application-Id": "mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja",
          "X-Parse-Master-Key": "TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            countries: result["results"],
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    let random_int = Math.floor(Math.random() * Math.floor(44));
    return (
      <div className="app">
        <div className="map">
          <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
              rotate: [-20.0, -52.0, 0],
              scale: 700,
            }}
            width={800}
            height={400}
            style={{ width: "100%", height: "auto" }}
          >
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#9998A3"
                      stroke="#EAEAEC"
                      onClick={() => {
                        this.setState(
                          {
                            selectedCountry: geo.properties["NAME"],
                            selectedCountryKey: geo.rsmKey,
                            oldCountry: this.state.countries[random_int].name,
                            init: true
                          },
                          () => {
                            if (
                              this.state.countries[random_int].name ===
                              this.state.selectedCountry
                            ) {
                              this.setState({ rightAnswer: true }, () =>
                                console.log(this.state.selectedCountry)
                              );
                            } else {
                              this.setState({ rightAnswer: false }, () =>
                                console.log(geo)
                              );
                            }
                          }
                        );
                      }}
                      style={{
                        default: {
                          fill:
                            this.state.selectedCountryKey === geo.rsmKey
                              ? this.state.rightAnswer
                                ? "green"
                                : "red"
                              : "",
                          outline: "none",
                        },
                        hover: {
                          fill: "#F53",
                          outline: "none",
                        },
                        pressed: {
                          fill: "red",
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
        <div className="side-nav">
          <div className='logo'>
            <img src='./logo.png' />
          </div>
          <h1>
            {this.state.isLoaded
              ? emoji(this.state.countries[random_int].emoji)
              : ""}
          </h1>
          <h2>
            {this.state.init ? this.state.isLoaded && this.state.rightAnswer ? (
              <a style={{ color: "green" }}> {"Правилен отговор"} </a>
            ) : (
              <a style={{ color: "red" }}> {"Грешен отговор"}</a>
            ): ""}
          </h2>
          {
            this.state.isLoaded ? (
              this.state.selectedCountry ? (
                this.state.rightAnswer ? (
                  ""
                ) : (
                  <p>
                    Ти избра {this.state.selectedCountry}, а знамето беше на{" "}
                    {this.state.oldCountry}
                  </p>
                )
              ) : (
                ""
              )
            ) : (
              ""
            )}
        </div>
      </div>
    );
  }
}

export default App;

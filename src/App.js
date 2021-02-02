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
    this.state = { countries: [] };
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
      `https://parseapi.back4app.com/classes/Country?limit=20&order=name&keys=name,emoji&where=${where}`,
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
    let random_int = Math.floor(Math.random() * Math.floor(20));
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
                          },
                          () => {
                            if (this.state.countries[random_int].name ===
                              this.state.selectedCountry){
                                this.setState({rightAnswer:true})
                              }
                              else{
                                this.setState({rightAnswer:false})
                              }
                          }
                        );
                      }}
                      style={{
                        default: {
                          fill: "#D6D6DA",
                          outline: "none",
                        },
                        hover: {
                          fill: "#F53",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#E42",
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
          <h1>
            {this.state.isLoaded
              ? emoji(this.state.countries[random_int].emoji)
              : ""}
          </h1>
          <h2>
            {this.state.isLoaded &&
            this.state.rightAnswer
              ? "YES"
              : "NO"}
          </h2>
        </div>
      </div>
    );
  }
}

export default App;

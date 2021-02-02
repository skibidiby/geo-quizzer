import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Map from "./Map.js";
import SideNav from "./SideNav";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="map-container">
          <Map
            selectedCountry={(selectedCountry) =>
              this.setState({ selectedCountry })
            }
          />
          <SideNav flag={(flag) => this.setState({ flag }, ()=>console.log(flag))} />
        </div>
      </div>
    );
  }
}

export default App;

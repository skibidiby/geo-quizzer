import logo from "./logo.svg";
import "./App.css";
import Map from "./Map.js";
import SideNav from './SideNav'

function App() {

  
  return (
    <div className="App">
      <div className="map-container">
        <Map />
        <SideNav />
      </div>
    </div>
  );
}

export default App;

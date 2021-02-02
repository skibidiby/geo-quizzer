import React from "react";
import "./App.css";
class SideNav extends React.Component {
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
            result: result['results'],
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
        
    return <div className="side-nav">
        {this.state.isLoaded ? this.state.result[0].emoji : ''}
    </div>;
    
  }
}

export default SideNav;

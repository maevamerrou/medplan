import React, { Component } from 'react'

import googleMapStyle from "../googleMapStyle";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



export class MapContainer extends Component {


  state = {
    mapPlaces: [
      { lat: 52.370292, lng: 4.897403},
      { lat: 52.370282, lng: 4.897503}
    ]
  }


  render() {

    const mapStyles = {
      width: '350px',
      height: '200px'
    };

    return (
    <>


      <div className="map-card">

        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={{ lat: 52.372471, lng: 4.890983}}
        >

          <Marker position={{lat: 52.370292, lng: 4.897403},{lat: 52.361236, lng: 4.880148}} />

        </Map>
        
      </div>

    </>
    )
  }
}

// Map.defaultProps = googleMapStyle;


export default GoogleApiWrapper({
  apiKey: 'AIzaSyCZhl9ojxqGbzsVsUCcf27lCQkhIk8IaBI'
})(MapContainer);



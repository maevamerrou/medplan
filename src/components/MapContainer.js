import React, { Component } from 'react'

import googleMapStyle from "../googleMapStyle";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



export class MapContainer extends Component {
  render() {

    // state = {
    //   mapPlaces: []
    // }


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

          <Marker position={{ lat: 52.370292, lng: 4.897403}} />

        </Map>
        
      </div>

    </>
    )
  }
}

// Map.defaultProps = googleMapStyle;


export default GoogleApiWrapper({
})(MapContainer);



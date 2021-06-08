import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Map, GoogleApiWrapper } from 'google-maps-react';
 
const mapStyles = {
    width: '100%',
    height: '100%',
  };

function MapContainer(props) {
    return (
        <div>
            <Map
                google={props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        </div>
        
    );
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDGArUEBa5ns09IA7nt7jP-xfNIUkToFts'
  })(MapContainer);

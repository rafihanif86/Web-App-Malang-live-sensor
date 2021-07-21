import React, { Component } from 'react';
import { Map, InfoWindow, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '600px'
};

var coords = { lat: -7.9569336, lng: 112.6321853 };
var sensorId = "";

export class MapData extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };
     
    onMarkerClick = (props, marker, e) =>
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });
     
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
            showingInfoWindow: false,
            activeMarker: null
            })
        }
    };  

    render() {
        coords = this.props.point;
        sensorId = this.props.sensorId;

        function getColor(index) {
            var colors = ["#00ffff", "#ffa500", "#ff00ff", "#ff0000", "#800080"];
            return colors[index];
        }

        return (
            <Map
                initialCenter={coords}
                google={this.props.google}
                style={mapStyles}
                zoom={16}
                onClick={this.onMapClicked}>

                {<Circle
                    radius={500}
                    center={coords}
                    // onMouseover={() => console.log('mouseover')}
                    // onClick={() => console.log('click')}
                    // onMouseout={() => console.log('mouseout')}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor={getColor(1)}
                    fillOpacity={0.3}
                />}

                {<Marker 
                    onClick={this.onMarkerClick}
                    name={'Sensor ID : '+ sensorId + ', Latitude : ' + coords.lat +  ', Longitude : ' + coords.lng}
                    position={coords} 
                />}


                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
      }
    }export default GoogleApiWrapper({
        apiKey: 'AIzaSyDTmZnN_dROiVsELimpq_N_S6Md-xBP-iM'
    })(MapData);
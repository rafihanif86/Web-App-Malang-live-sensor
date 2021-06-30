import React, { Component } from 'react';
import { Map, InfoWindow, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
    
  };

  
const coords = { lat: -7.9569336, lng: 112.6321853 };


const points = [
    { lat: -7.9446076, lng: 112.615169 },
    { lat: -7.934909, lng: 112.606117 },
    { lat: -7.943147, lng: 112.591316 },
    { lat: -7.96457, lng: 112.610756 },
    { lat: -7.98617, lng: 112.610535 }
];

var logBook = [];
var cluster = [];
var clusterPoints = [];
var clusterInfo = [];

export class MapContainer extends Component {
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

        cluster = this.props.dataCluster;
        logBook = this.props.logBook;

        console.log('cluster Maps ', cluster);
        console.log('logBook Maps ', logBook);
        console.log('points Maps ', points);

        cluster.forEach( function(cl, i) {
            cl.cluster.forEach( function(point, j) {
                clusterPoints.push({
                    lat: point[3], lng: point[2]
                });
                clusterInfo.push({
                    group: i,
                    temperature: point[0],
                    humidity: point[1]
                });
            });
        });

        function getColor(index) {
            var colors = ["#00ffff", "#ffa500", "#ff00ff", "#ff0000", "#800080"];
            return colors[index];
        }


        return (
        <>
            <Map
                initialCenter={coords}
                google={this.props.google}
                style={mapStyles}
                zoom={13}
                onClick={this.onMapClicked}
                >

                {clusterPoints.map((point, index) => 
                    <Circle
                    radius={1200}
                    center={point}
                    onMouseover={() => console.log('mouseover')}
                    onClick={() => console.log('click')}
                    onMouseout={() => console.log('mouseout')}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor={getColor(clusterInfo[index].group)}
                    fillOpacity={0.2}
                />)}

                {clusterPoints.map((point, index) => 
                    <Marker 
                        onClick={this.onMarkerClick}
                        name={'Group : ' + clusterInfo[index].group + ', Humidity : '  + clusterInfo[index].humidity + ', Temperature : ' + clusterInfo[index].temperature }
                        position={point} />)}

                
    
                <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                    <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
          </>
        );
      }
    }export default GoogleApiWrapper({
        apiKey: 'AIzaSyDGArUEBa5ns09IA7nt7jP-xfNIUkToFts'
    })(MapContainer);
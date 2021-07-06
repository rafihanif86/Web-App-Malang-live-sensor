import React, { Component } from 'react';
import { Map, InfoWindow, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};
  
const coords = { lat: -7.9569336, lng: 112.6321853 };
var logBook = [];
var cluster = [];
var clusterPoints = [];
var clusterInfo = [];
var centeroidPoint = [];
var centeroidInfo = [];

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

        logBook = [];  
        cluster = [];
        clusterPoints = [];
        clusterInfo = [];
        centeroidPoint = [];
        centeroidInfo = [];
        
        cluster = this.props.dataCluster;
        logBook = this.props.logBook;

        console.log('cluster Maps ', cluster);
        console.log('logBook Maps ', logBook);
        console.log('clusterPoints Maps ', clusterPoints);

        cluster.forEach( function(cl, i) {
            centeroidPoint.push({
                lat: cl.centroid[3], lng: cl.centroid[2]
            });
            centeroidInfo.push({
                group: i + 1,
                temperature: cl.centroid[0],
                humidity: cl.centroid[1],
                marker: cl.cluster.length
            });
            cl.cluster.forEach( function(point, j) {
                clusterPoints.push({
                    lat: point[3], lng: point[2]
                });
                clusterInfo.push({
                    group: i + 1,
                    temperature: point[0],
                    humidity: point[1]
                });
            });
        });

        function getColor(index) {
            var colors = ["#00ffff", "#ffa500", "#ff00ff", "#ff0000", "#800080"];
            return colors[index];
        }

        function getRadius(index) {
            var radius = index * 1000;
            return radius;
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
                    radius={1000}
                    center={point}
                    // onMouseover={() => console.log('mouseover')}
                    // onClick={() => console.log('click')}
                    // onMouseout={() => console.log('mouseout')}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor={getColor(clusterInfo[index].group)}
                    fillOpacity={0.3}
                />)}

                {clusterPoints.map((point, index) => 
                    <Marker 
                        onClick={this.onMarkerClick}
                        name={'cluster : ' + clusterInfo[index].group + ', Humidity : '  + clusterInfo[index].humidity + '%, Temperature : ' + clusterInfo[index].temperature }
                        position={point} />)}

                {centeroidPoint.map((point, index) => 
                    <Circle
                    radius={getRadius(centeroidInfo[index].marker)}
                    center={point}
                    // onMouseover={() => console.log('mouseover')}
                    // onClick={() => console.log('click')}
                    // onMouseout={() => console.log('mouseout')}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor={getColor(centeroidInfo[index].group)}
                    fillOpacity={0.2}
                />)}

                {centeroidPoint.map((point, index) => 
                    <Marker 
                        onClick={this.onMarkerClick}
                        name={'centeroid of cluster : ' + centeroidInfo[index].group + ', Humidity : '  + centeroidInfo[index].humidity + '%, Temperature : ' + centeroidInfo[index].temperature }
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
import React, { Component } from 'react';
import { Map, InfoWindow, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';

import Loading from '../loading';


const mapStyles = {
    width: '98%',
    height: '600px'
};

var coords = false;
var cluster = [];
var clusterPoints = [];
var clusterInfo = [];
var centeroidPoint = [];
var centeroidInfo = [];
var centeroidRange = [];
var centroidLat = [];
var centroidLng = [];

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
        cluster = [];
        clusterPoints = [];
        clusterInfo = [];
        centeroidPoint = [];
        centeroidInfo = [];
        cluster = this.props.dataCluster;
        centeroidRange = [];
        centroidLat = [];
        centroidLng = [];

        cluster.forEach( function(cl, i) {
            var range = 0;
            centroidLat.push(cl.centroid[3]);
            centroidLng.push(cl.centroid[2]);
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

                //menghitung jarak marker ke centeroid
                var dis = Math.sqrt((point[3] - cl.centroid[3])**2 + (point[2] - cl.centroid[2])**2);
                if(dis >= range){
                    range = dis;
                }
            });
            centeroidRange.push(Math.ceil(((range*0.15)+range)*100000));
        });


        //membuat coord dinamis
        var sumLng = 0;
        centroidLng.map((dt) => {sumLng += dt});
        var avgLng = sumLng / centroidLng.length;

        var sumLat = 0;
        centroidLat.map((dt) => {sumLat += dt});
        var avgLat = sumLat / centroidLat.length;
        
        coords = { lat: avgLat, lng: avgLng };

        function getColor(index) {
            var colors = ["#00ffff", "#ffa500", "#ff00ff", "#ff0000", "#800080"];
            return colors[index];
        }

        return (
            <div>
            {coords ?   
                <>
                <Map
                    initialCenter={coords}
                    google={this.props.google}
                    style={mapStyles}
                    zoom={13}
                    onClick={this.onMapClicked}>

                    {clusterPoints.map((point, index) => 
                        <Circle
                            radius={500}
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
                            name={'Marker : '+ (index + 1) + ', Cluster : ' + clusterInfo[index].group + ', Humidity : '  + clusterInfo[index].humidity + '%, Temperature : ' + clusterInfo[index].temperature +'°C'}
                            position={point} />)}

                    {centeroidPoint.map((point, index) => 
                        <Circle
                            radius={centeroidRange[index]}
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
                            name={'Centeroid of cluster : ' + centeroidInfo[index].group + ', Humidity : '  + centeroidInfo[index].humidity + '%, Temperature : ' + centeroidInfo[index].temperature + '°C, Range : ' + centeroidRange[index] + ' m' }
                            position={point} />
                    )}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                            <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            </div>
                    </InfoWindow>
                </Map>
                </>
                : <h1><center> Loading For Data.. <br/><Loading /></center></h1>}
            </div>
        );
      }
    }export default GoogleApiWrapper({
        apiKey: 'AIzaSyDTmZnN_dROiVsELimpq_N_S6Md-xBP-iM'
    })(MapContainer);
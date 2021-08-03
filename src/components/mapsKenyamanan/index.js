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
        cluster = this.props.dataCluster;


        console.log('cluster', cluster);
        
        cluster.forEach( function(cl, i) {
            var range = 0;
            cl.cluster.forEach( function(point, j) {
                clusterPoints.push({
                    lat: point[3], lng: point[2]
                });

                clusterInfo.push({
                    group: i + 1,
                    temperature: String(point[0]).substr(0,5),
                    humidity: String(point[1]).substr(0,5)
                });
            });
        });

        console.log('clusterPoints ', clusterPoints);
        

        //membuat coord dinamis
        var sumLng = 0;
        var sumLat = 0;
        clusterPoints.map((dt) => {sumLng += dt.lng; sumLat += dt.lat;});
        var avgLng = sumLng / clusterPoints.length;
        var avgLat = sumLat / clusterPoints.length;
        coords = { lat: avgLat, lng: avgLng };

        function getColor(index) {
            var colors = ["#00ffff", "#ffa500", "#ff00ff", "#ff0000", "#800080"];
            return colors[index];
        }

        function suhu(temp){
            var label = null;
            if(temp < 21){
                label = 'Tidak Nyaman';
            }else if(temp >= 21 && temp <= 24){
                label = 'Nyaman';
            }else if(temp >= 25 && temp <= 27){
                label = 'Sebagian Nyaman';
            }else{
                label = 'Tidak Nyaman';
            }
            return label;
        }

        function kelembaban(hum){
            var label = null;
            if(hum < 45){
                label = 'Terlalu Kering';
            }else if(hum >= 45 && hum <= 65){
                label = 'Ideal';
            }else{
                label = 'Terlalu Lembab';
            }
            return label
        }

        return (
            <div style={{ minHeight: "600px", maxWidth:'98%'}}>
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
                            name={'Marker : '+ (index + 1) + ', Cluster : ' + clusterInfo[index].group + ', Humidity : '  + clusterInfo[index].humidity + '% ('+ kelembaban(clusterInfo[index].humidity)+'), Temperature : ' + clusterInfo[index].temperature +'°C ('+ suhu(clusterInfo[index].temperature) +')'}
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
                : <h1><center> Loading For Data.. <br/><Loading /></center></h1>}
            </div>
        );
      }
    }export default GoogleApiWrapper({
        apiKey: 'AIzaSyDTmZnN_dROiVsELimpq_N_S6Md-xBP-iM'
    })(MapContainer);
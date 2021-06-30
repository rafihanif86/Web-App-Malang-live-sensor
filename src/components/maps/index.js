import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Map, InfoWindow, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';
import firebase from '../../config/firebase';

const mapStyles = {
    width: '100%',
    height: '100%',
    
  };


  const todoList = [];
  const loading = false;
  const userList = [];
  const logBook = [];
  var clusterData = [];
  let vectors = new Array();
  var points = [];

  var cluster1 = [];
  var cluster2 = [];

  
  const todoRef = firebase.database().ref('Log');
  
const coords = { lat: -7.9569336, lng: 112.6321853 };


points = [
    { lat: -7.9446076, lng: 112.615169 },
    { lat: -7.934909, lng: 112.606117 },
    { lat: -7.943147, lng: 112.591316 },
    { lat: -7.96457, lng: 112.610756 },
    { lat: -7.98617, lng: 112.610535 }
];



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

    componentDidUpdate = () =>{
        
    }


    render() {

        let circle;
        let marker;

        function getDataFb(){
            todoRef.on('value', (snapshot) => {
              const todos = snapshot.val();
              const todoList = [];
              while (logBook.length > 0) {
                logBook.pop();
              } 
        
              for (let id in todos) {
                todoList.push({ id, ...todos[id] });
                const sameData = userList.includes(todos[id].user);
                if(!sameData){
                  userList.push(todos[id].user);
                }
              }
              // setTodoList(todoList);
        
              userList.forEach(function(user){
                const logUser = [];
                todoList.forEach(function(item){
                  if(item.user == user){
                    logUser.push(item);
                  }
                });
                logBook.push(logUser[logUser.length-1]);
        
                
              });
        
              //memanggil fungsi clustering
              clustering(2);
        
              console.log("list of user ", userList);
            
              console.log("list of Logbook ", logBook);
            });
        
        }


        function setCluster(point){
            cluster1 = [];
            cluster2 =  [];
            for(var i = 0; i < point.length; i++){
                for(var a = 0; a < point[i].cluster.length; a++){
                    if(i == 0){
                        cluster1.push({lat: point[i].cluster[a][3], lng: point[i].cluster[a][2]});
                    }else if(i == 1){
                        cluster2.push({lat: point[i].cluster[a][3], lng: point[i].cluster[a][2]});
                    }
                }
            }
        
            console.log('Cluster 1', cluster1);
            console.log('Cluster 2', cluster2);
            cluster1.map((point) => circlePrint(point,'#FFFFFF'))
            cluster2.map((point) => circlePrint(point,'#FFFFFF'))

            cluster1.map((point) => markerAdd(point))
            cluster2.map((point) => markerAdd(point))
        }

        //fungsi clustering menggunakan node-kmeans
        function clustering(cluster){
            vectors = new Array();
            for (let i = 0 ; i < logBook.length ; i++) {
            vectors[i] = [ logBook[i]['temperature'] , logBook[i]['humidity'], logBook[i]['latitude'], logBook[i]['longitude']];
            }
            
            const kmeans = require('node-kmeans');
            kmeans.clusterize(vectors, {k: cluster}, (err,res) => {
            if (err) {
                console.error(err);
            }else{
                clusterData = res;
            } 
            console.log("cluster ", clusterData);
            setCluster(clusterData);
            });
        }

        function markerAdd(point){
            var pointM = [
                { lat: point[3], lng: point[2]}
            ];
            marker = <Marker 
                        
                        name={'Current location '  + point[3] + ', ' + point[2]}
                        position={pointM} />;
        }
         
        function circlePrint(point, fillColor){
            console.log('point circle',point);
            console.log('point circle ' + point[3] + ', ' +point[2]);
            var pointM = [
                { lat: point[3], lng: point[2]}
            ];
        
            circle =
                <Circle
                    radius={1200}
                    center={pointM}
                    onMouseover={() => console.log('mouseover')}
                    onClick={() => console.log('click')}
                    onMouseout={() => console.log('mouseout')}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor={fillColor}
                    fillOpacity={0.2}
                />;
            
        }

        return (
        <>
            {getDataFb()}
            <Map
                initialCenter={coords}
                google={this.props.google}
                style={mapStyles}
                zoom={13}
                onClick={this.onMapClicked}
                >

                {circle}
                {marker}
                {cluster1.map((point) => 
                    <Marker 
                        onClick={this.onMarkerClick}
                        name={'Current location '  + point.lat + ', ' + point.lng}
                        position={point} />)}

                {cluster2.map((point) => 
                    <Marker 
                        onClick={this.onMarkerClick}
                        name={'Current location '  + point.lat + ', ' + point.lng}
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
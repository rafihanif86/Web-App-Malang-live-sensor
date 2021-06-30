import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import { Table, Container } from 'reactstrap';
import Row from './row';
import Maps from '../maps/maps';

export default function Data() {
  
    const [todoList, setTodoList] = useState();
    const [loading, setLoading] = useState(true);
    const userList = [];
    const logBook = [];
    var clusterData = [];
    let vectors = new Array();
    var printMaps = '';

    var mapsAdd = '';
    
    const todoRef = firebase.database().ref('Log');

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
          // console.log('%o',res);
          clusterData = res;
        } 
        console.log("cluster ", clusterData);
        setLoading(false);
      });
    }

    function getDataFb(){
      todoRef.on('value', (snapshot) => {
        setLoading(true);
        //   console.log(snapshot.val());
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
        setTodoList(todoList);

        userList.forEach(function(user){
          const logUser = [];
          todoList.forEach(function(item){
            if(item.user == user){
              // console.log("user sama ", user);
              logUser.push(item);
            }
          });
          // console.log("logUser ", logUser);
          logBook.push(logUser[logUser.length-1]);

          
        });

        //memanggil fungsi clustering
        clustering(2);

        console.log("list of user ", userList);
      
        console.log("list of Logbook ", logBook);
      });

      
    }

    

    useEffect(() => {
      getDataFb();
    }, [])

    if(loading){
      mapsAdd = <h1> Loading For Maps.. </h1>;
    }else{

      mapsAdd = <Maps dataCluster={clusterData} logBook={logBook} key={Math.random()}/>;
    }

  return (
    <div>
      {mapsAdd}
      <Container>
        <h2>Data Logbook</h2>
        <Table>
          <thead>
              <tr>
              <th>Key</th>
              <th>Time</th>
              <th>Humidity</th>
              <th>Temp</th>
              <th>Long, Lat</th>
              <th>User</th>
              <th></th>
              </tr>
          </thead>
          <tbody>
              {todoList ? todoList.map((todo, index) => <Row todo={todo} key={index} />) : <h3> Loading Data.. </h3>} 
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

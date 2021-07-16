import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import Maps from '../maps';
import kmeans from './kmeans';
import TableCluster from '../Table/tableCluster';
import TableCentroid from '../Table/tableCentroid';
import {Card, CardBody} from 'reactstrap';

export default function Data() {
  
    var [todoList, setTodoList] = useState();
    const [loading, setLoading] = useState(true);
    const userList = [];
    const [logBook, setLogBook] = useState([]);
    const [clusterData, setClusterData] = useState([]);
    var mapsAdd = '';
    var tabelCluster = '';
    var tabelCentroid = '';

    
    const todoRef = firebase.database().ref('Log');

    //fungsi clustering menggunakan node-kmeans
    // function clustering(cluster){
    //   var vectors = [];
    //   for (let i = 0 ; i < logBook.length ; i++) {
    //     vectors[i] = [ logBook[i]['temperature'] , logBook[i]['humidity'], logBook[i]['latitude'], logBook[i]['longitude']];
    //   }

      
    //   const kmeans = require('node-kmeans');
    //   kmeans.clusterize(vectors, {k: cluster}, (err,res) => {
    //     if (err) {
    //       console.error(err);
    //     }else{
    //       // console.log('%o',res);
    //       setClusterData(res);
    //     } 
    //     // console.log("cluster ", clusterData);
    //     setLoading(false);
    //   });
    // }

    //fungsi clustering menggunakan kmeans.js
    function clusterKmeans(sumCluster){
      let rawData = [];

      for (let i = 0 ; i < logBook.length ; i++) {
        rawData[i] = [ logBook[i]['temperature'] , logBook[i]['humidity'], logBook[i]['latitude'], logBook[i]['longitude']];
      }

      var tmp = kmeans(sumCluster, rawData);
      // console.log('tmp ', tmp);
      setClusterData(tmp);
      setLoading(false);
    }


    const getDataFb = () => {
      setLoading(true);
      todoRef.on('value', (snapshot) => {
        //   console.log(snapshot.val());
        const todos = snapshot.val();
        const todoList1 = [];
        while (logBook.length > 0) {
          logBook.pop();
        } 

        for (let id in todos) {
          todoList1.push({ id, ...todos[id] });
          const sameData = userList.includes(todos[id].user);
          if(!sameData){
            userList.push(todos[id].user);
          }
        }
        todoList = todoList1;
        setTodoList(todoList);

        userList.forEach(function(user){
          const logUser = [];
          todoList.forEach(function(item){
            if(item.user === user){
              // console.log("user sama ", user);
              logUser.push(item);
            }
          });
          // console.log("logUser ", logUser);
          logBook.push(logUser[logUser.length-1]);          
        });
        setLogBook(logBook);

        //memanggil fungsi clustering kmeans.js
        clusterKmeans(2);

        //memanggil fungsi clustering node-kmeans
        // clustering(2);

        // console.log("list of user ", userList);
        // console.log("list of Logbook ", logBook);
      });
    }

    useEffect(() => {
      getDataFb();
    }, [])

    if(loading){
      mapsAdd = <h1> Loading For Maps.. </h1>;
    }else{
      mapsAdd = <Maps dataCluster={clusterData} key={1}/>;
      tabelCluster = <TableCluster dataCluster={clusterData} key={1}/>;
      tabelCentroid = <TableCentroid dataCluster={clusterData} key={1}/>
    }

  return (
    // <Card>
    //   <CardBody>
    //     <h2><i>Realtime sensors</i> dengan K-Means <i>Clustering Algorithm</i></h2>
    //     <p>Mengelompokkan data suhu, kelembaban, dan lokasi menggunakan metode K-means Clustering dari data sensor realtime yang telah disebar di beberapa titik.</p>
    //   </CardBody>
    //   {mapsAdd}
    //   <div style={{ minHeight: "600px"}}></div>
    //   <CardBody>
    //     <div>{tabelCentroid}</div>
    //     <div>{tabelCluster}</div>
    //   </CardBody>
    // </Card>
    <div>
      <div>
        <hr/>
        <h2><i>Realtime sensors</i> dengan K-Means <i>Clustering Algorithm</i></h2>
        <p>Mengelompokkan data suhu, kelembaban, dan lokasi menggunakan metode K-means Clustering dari data sensor realtime yang telah disebar di beberapa titik.</p>
        <hr/>
      </div>
      <div style={{ minHeight: "600px"}}>{mapsAdd}</div>
      <div>{tabelCentroid}</div>
      <div>{tabelCluster}</div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';

//components
import kmeans from './kmeans';
import Loading from '../loading';
import Maps from '../mapsCluster';
import TableCluster from '../Table/tableCluster';
import TableCentroid from '../Table/tableCentroid';

export default function Data() {
  
    const [loading, setLoading] = useState(true);
    const [logBook, setLogBook] = useState([]);
    const [clusterData, setClusterData] = useState([]);
    var [arrayCluster, setArrayCluster] = useState([]);
    var [todoList, setTodoList] = useState();
    var userList = [];
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

      //mamanggil fungsi clustering
      var tmp = kmeans(sumCluster, rawData);
      setClusterData(tmp);

      var dataCl = [];
      for(let i = 0; i < tmp.length; i++){
        for(let b = 0; b < tmp[i].cluster.length; b++){
            var d = null;
            d = tmp[i].cluster[b];
            d.push(i);
            d.push(logBook[tmp[i].clusterInd[b]].user);
            dataCl.push(d);
        }
      }
      setArrayCluster(dataCl);      
      setLoading(false);
    }


    const getDataFb = () => {
      setLoading(true);
      todoRef.on('value', (snapshot) => {
        const todos = snapshot.val();
        const todoList1 = [];

        //menghapus isi logbook
        while (logBook.length > 0) {
          logBook.pop();
        } 

        //merubah data dari objek menjadi array objek dan mencari list user
        for (let id in todos) {
          todoList1.push({ id, ...todos[id] });
          const sameData = userList.includes(todos[id].user);
          if(!sameData){
            userList.push(todos[id].user);
          }
        }
        todoList = todoList1;
        setTodoList(todoList);

        //mencari data logbook terbaru dari setiap user
        userList.forEach(function(user){
          const logUser = [];
          todoList.forEach(function(item){
            if(item.user === user){
              logUser.push(item);
            }
          });
          logBook.push(logUser[logUser.length-1]);          
        });
        setLogBook(logBook);

        //memanggil fungsi clustering kmeans.js
        clusterKmeans(2);

        //memanggil fungsi clustering node-kmeans
        // clustering(2);
      });
    }

    useEffect(() => {
      getDataFb();
    }, [])

    if(loading){
      mapsAdd = <h1><center> Loading For Maps.. <br/><Loading /></center></h1>;
      tabelCentroid = <h1><center>Loading For Data.. <br/><Loading /></center></h1>;
    }else{
      mapsAdd = <Maps dataCluster={clusterData} key={1}/>;
      tabelCluster = <TableCluster dataCl={arrayCluster} realtime={true} key={1}/>;
      tabelCentroid = <TableCentroid dataCluster={clusterData} key={1}/>
    }
    
  return (
    <div>
      <div>
        <h2>Pengelompokan Karakteristik Berdasarkan Lokasi, Suhu dan Kelembaban</h2>
        <p>Mengelompokkan data suhu, kelembaban, dan lokasi menggunakan metode K-means Clustering dari data sensor realtime yang telah disebar di beberapa titik.</p>
        <hr/>
      </div>
      <div>
        {!loading ? 
          <>
            {tabelCluster}
            {tabelCentroid}
            <br/>
            <div style={{ minHeight: "600px"}}>{mapsAdd}</div>
            <hr/>
          </>
          : <h1><center> Loading For Data.. <br/><Loading /><br/></center></h1>}
      </div>
    </div>
  );
}
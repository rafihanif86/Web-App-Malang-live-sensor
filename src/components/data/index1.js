import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';

//components
import kmeans from './kmeans';
import Loading from '../loading';
import Maps from '../mapsKenyamanan';
import TableCluster from '../TableKenyamanan/tableCluster';
import TableCentroid from '../TableKenyamanan/tableCentroid';

export default function Data() {
  
    const [loading, setLoading] = useState(true);
    const [logBook, setLogBook] = useState([]);
    const [clusterData, setClusterData] = useState([]);
    const [kenyamananSuhu, setKenyamananSuhu] = useState([]);
    const [kenyamananKelembaban, setKenyamananKelembaban] = useState([]);
    var [arrayCluster, setArrayCluster] = useState([]);
    var [todoList, setTodoList] = useState();
    var userList = [];
    var mapsAdd = '';
    var tabelCluster = '';
    var tabelCentroid = '';

    
    const todoRef = firebase.database().ref('Log');

    //fungsi clustering menggunakan kmeans.js
    function clusterKmeans(sumCluster){
      var rawData = [];
      for (let i = 0 ; i < logBook.length ; i++) {
        var dt = [logBook[i].temperature, logBook[i].humidity];
        rawData.push(dt);
      }
      
      //mamanggil fungsi clustering
      var tmp = kmeans(sumCluster, rawData);
      console.log('tmp', tmp);
      
      //menambahkan data lokasi
      var clusteredDt = tmp;
      for(let i = 0; i < tmp.length; i++){
        for(let b = 0; b < tmp[i].clusterInd.length; b++){
          console.log('clusteredDt[i].cluster[b]', tmp[i].cluster[b]);
          
          clusteredDt[i].cluster[b].push(logBook[tmp[i].clusterInd[b]].latitude);
          clusteredDt[i].cluster[b].push(logBook[tmp[i].clusterInd[b]].longitude);
        }
      }
      setClusterData(clusteredDt);
      console.log('clusteredDt ',clusteredDt);
      
      for(let i = 0; i < clusteredDt.length; i++){
        if(clusteredDt[i].centroid[1] < 45){
          kenyamananKelembaban.push('Terlalu Kering');
        }else if(clusteredDt[i].centroid[1] >= 45 && clusteredDt[i].centroid[1] <= 65){
          kenyamananKelembaban.push('Ideal');
        }else{
          kenyamananKelembaban.push('Terlalu Lembab');
        }

        if(clusteredDt[i].centroid[2] < 21){
          kenyamananSuhu.push('Tidak Nyaman');
        }else if(clusteredDt[i].centroid[2] >= 21 && clusteredDt[i].centroid[2] <= 24){
          kenyamananSuhu.push('Nyaman');
        }else if(clusteredDt[i].centroid[2] >= 25 && clusteredDt[i].centroid[2] <= 27){
          kenyamananSuhu.push('Sebagian Nyaman');
        }else{
          kenyamananSuhu.push('Tidak Nyaman');
        }
      }
      setKenyamananSuhu(kenyamananSuhu);
      setKenyamananKelembaban(kenyamananKelembaban);

      console.log('kenyamananSuhu', kenyamananSuhu);
      console.log('kenyamananKelembaban', kenyamananKelembaban);

      
      

      var dataCl = [];
      for(let i = 0; i < clusteredDt.length; i++){
        for(let b = 0; b < clusteredDt[i].cluster.length; b++){
            var d = null;
            d = clusteredDt[i].cluster[b];
            console.log('d', d);
            
            d.push(i);
            d.push(logBook[clusteredDt[i].clusterInd[b]].user);
            dataCl.push(d);
        }
      }
      console.log('dataCl', dataCl);
      
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
      mapsAdd = <Maps dataCluster={clusterData} key={1} style={{position: 'fixed', overflow: 'auto', minHeight: '100vh'}}/>;
      tabelCluster = <TableCluster dataCl={arrayCluster} realtime={true} key={1}/>;
      tabelCentroid = <TableCentroid dataCluster={clusterData} key={1}/>;
    }
    
  return (
    <div>
      <div>
        <h2>Pengelompokan Nilai Kenyamanan Berdasarkan Suhu dan Kelembaban</h2>
        <p>Mengelompokkan karakteristik data suhu dan kelembaban menggunakan metode K-means Clustering dari data sensor realtime yang telah disebar di beberapa titik. Untuk mendapatkan nilai kenyamanan setiap kelompok dan lokasi menggunakan <i>Temperature Humidity Index</i>.</p>
        <hr/>
      </div>
      <div>
        {!loading ? 
          <>
            {tabelCentroid}
            {tabelCluster}
            <hr/>
            {mapsAdd}
            <hr/>
          </>
          : <h1><center> Loading For Data.. <br/><Loading /><br/></center></h1>}
      </div>
    </div>
  );
}
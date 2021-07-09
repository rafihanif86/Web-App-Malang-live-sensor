import React, { useState, useEffect } from 'react';
import Maps from '../maps';
import kmeans from './kmeans';
import staticData from './staticData.json';


export default function Data() {
  
    const [loading, setLoading] = useState(true);
    const [logBook, setLogBook] = useState([]);
    const [clusterData, setClusterData] = useState([]);
    var mapsAdd = '';


    if(logBook.length === 0){
        setLogBook(staticData);
    }
    

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
      console.log('tmp ', tmp);
      setClusterData(tmp);
      setLoading(false);
    }


    const getDataFb = () => {
        setLoading(true);

        //memanggil fungsi clustering kmeans.js
        if(logBook.length !== 0){
            clusterKmeans(2);
        }

        //memanggil fungsi clustering node-kmeans
        // clustering(2);

        // console.log("list of user ", userList);
        console.log("list of Logbook ", logBook);
    }

    useEffect(() => {
      getDataFb();
    }, [])

    if(loading){
      mapsAdd = <h1> Loading For Maps.. </h1>;
    }else{
      mapsAdd = <Maps dataCluster={clusterData} key={'1'}/>;
      // mapsAdd = <Maps dataCluster={clusterData} logBook={logBook} key={'1'}/>;
    }

  return (
    <div>
      <div>
        <hr/>
        <center>
          <h2><i>Static Data</i> dengan K-Means <i>Clustering Algorithm</i></h2>
          <p>Mengelompokkan data suhu, kelembaban, dan lokasi menggunakan metode K-means Clustering dari data yang telah disiapkan menyerupai data sensor realtime.</p>
        </center>
        <hr/>
      </div>
      <div>{mapsAdd}</div>
      
      <div style={{ minHeight: "800px"}}></div>
    </div>
  );
}
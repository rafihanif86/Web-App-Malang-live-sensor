import React, { useState, useEffect } from 'react';

//components
import kmeans from './kmeans';
import Loading from '../loading';
import Maps from '../mapsCluster';
import TableCluster from '../Table/tableCluster';
import TableCentroid from '../Table/tableCentroid';

//data json
import staticData from './staticData.json';

export default function Data() {
  
    const [loading, setLoading] = useState(true);
    const [logBook, setLogBook] = useState([]);
    const [clusterData, setClusterData] = useState([]);
    var [arrayCluster, setArrayCluster] = useState([]);
    var mapsAdd = '';
    var tabelCluster = '';
    var tabelCentroid = '';

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
      setClusterData(tmp);

      var dataCl = [];
      for(let i = 0; i < tmp.length; i++){
          for(let b = 0; b < tmp[i].cluster.length; b++){
              var d = null;
              d = tmp[i].cluster[b];
              d.push(i)
              dataCl.push(d);
          }
      }
      setArrayCluster(dataCl);

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
    }

    useEffect(() => {
      getDataFb();
    }, [])

    if(loading){
      mapsAdd = <h1><center> Loading For Maps.. <br/><Loading /></center></h1>;
      tabelCentroid =<h1><center>Loading For Data.. <br/><Loading /></center></h1>;
    }else{
      mapsAdd = <Maps dataCluster={clusterData} key={'1'}/>;
      tabelCluster = <TableCluster dataCl={arrayCluster} realtime={false} key={1}/>;
      tabelCentroid = <TableCentroid dataCluster={clusterData} key={1}/>
    }

  return (
    <div>
      <div>
        <h2><i>Static Data</i> dengan K-Means <i>Clustering Algorithm</i></h2>
        <p>Mengelompokkan data suhu, kelembaban, dan lokasi menggunakan metode K-means Clustering dari data yang telah disiapkan menyerupai data sensor realtime.</p>     
        <hr/>
      </div>
      <div style={{ minHeight: "600px"}}>{mapsAdd}</div>
      <div>
        <div>{tabelCentroid}</div>
        <div>{tabelCluster}</div>
        <hr/>
      </div>
    </div>
  );
}
import React from 'react';
import { Table, Container } from 'reactstrap';

export default function TabelCluster({ dataCluster }) {

    var dataCT = [];
    for(let i = 0; i < dataCluster.length; i++){
            var d = null;
            d = dataCluster[i].centroid;
            d.push(dataCluster[i].cluster.length);
            dataCT.push(d);
    }

    //menghitung range cluster
    var centeroidRange = [];
    dataCluster.forEach( function(cl, i) {
        var range = 0;
        cl.cluster.forEach( function(point, j) {
            //menghitung jarak marker ke centeroid
            var dis = Math.sqrt((point[3] - cl.centroid[3])**2 + (point[2] - cl.centroid[2])**2);
            if(dis >= range){range = dis;}
        });
        centeroidRange.push(Math.ceil(((range*0.15)+range)*100000));
    });

    function labelTHI(thi) {  
        var thiLabel = null;
        if(thi >= 21 && thi <= 24){
            thiLabel = 'Nyaman';
        }else if(thi >= 25 && thi <= 27){
            thiLabel = 'Cukup Nyaman';
        }else{
            thiLabel = 'Tidak Nyaman';
        }
        return thiLabel;
    }

    var parmTHI = "< 21 (Tidak Nyaman), 21-24 (Nyaman), 25-27 (Cukup Nyaman), >27 (Tidak Nyaman).";

    return (
        <div>
            <Container>
                <h2>Centroid Data</h2>
                <p>Hasil perhitungan dari rata-rata setiap cluster. Serta Perhitungan <i>Temperature Humidity Index</i> disetiap hasil perhitungan centroid.</p>
                <Table>
                    <thead>
                        <tr>
                            <th>Centroid of</th>
                            <th>THI*Rate</th>
                            <th>Humidity</th>
                            <th>Temp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCT ? dataCT.map((dt, index) => 
                            <tr key={index}>
                                <td>Cluster {index + 1}</td>
                                <td>{String(0.8 * dt[0] +((dt[1]*dt[0])/500)).substr(0,5)}&deg;C 
                                    ({labelTHI(0.8 * dt[0] +((dt[1]*dt[0])/500))})</td>
                                <td>{String(dt[1]).substr(0,5)}%</td>
                                <td>{String(dt[0]).substr(0,5)}&deg;C</td>
                            </tr>) : <h3> Loading Data.. </h3>} 
                    </tbody>
                </Table>
                <p>*THI <i>Temperature Humidity Index</i> : {parmTHI}</p>
            </Container>
        </div>
    );
}

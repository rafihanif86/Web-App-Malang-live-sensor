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

    return (
        <div>
            <Container>
                <h2>Centroid Data</h2>
                <p>Hasil perhitungan dari rata-rata setiap cluster.</p>
                <Table>
                    <thead>
                        <tr>
                            <th>Centroid of</th>
                            <th>Cluster Range</th>
                            <th>Humidity</th>
                            <th>Temp</th>
                            <th>Lat, Long</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCT ? dataCT.map((dt, index) => 
                            <tr key={index}>
                                <td>Cluster {index + 1}</td>
                                <td>{centeroidRange[index]} m</td>
                                <td>{dt[1]}%</td>
                                <td>{dt[0]}&deg;C</td>
                                <td>{dt[3]}, {dt[2]}</td>
                            </tr>) : <h3> Loading Data.. </h3>} 
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

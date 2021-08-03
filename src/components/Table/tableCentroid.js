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

    function getColor(index) {
        var colors = ["#00ffff", "#ffa500", "#ff00ff", "#ff0000", "#800080"];
        return colors[index];
    }

    return (
        <div>
            <Container>
                <h2>Cluster Data</h2>
                <p>Hasil perhitungan dari rata-rata setiap cluster.</p>
                <Table>
                    <thead>
                        <tr>
                            <th>Centroid of</th>
                            <th>Cluster Range</th>
                            <th>Humidity</th>
                            <th>Temperature</th>
                            <th>Lat, Long</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCT ? dataCT.map((dt, index) => 
                            <tr key={index} style={{ background : getColor(index)+'80'}}>
                                <td>Cluster {index + 1}</td>
                                <td>{centeroidRange[index]} m</td>
                                <td>{String(dt[1]).substr(0,5)}%</td>
                                <td>{String(dt[0]).substr(0,5)}&deg;C</td>
                                <td>{String(dt[3]).substr(0,10)}, {String(dt[2]).substr(0,10)}</td>
                            </tr>) : <h3> Loading Data.. </h3>} 
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

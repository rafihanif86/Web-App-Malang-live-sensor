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

    return (
        <div>
            <Container>
                <h2>Centroid Data</h2>
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
                            <td>{dt[4]} Km</td>
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
import React from 'react';
import { Table, Container } from 'reactstrap';

export default function TabelCluster({ dataCluster }) {

  var dataCl = [];
  for(let i = 0; i < dataCluster.length; i++){
      for(let b = 0; b < dataCluster[i].cluster.length; b++){
        var d = null;
        d = dataCluster[i].cluster[b];
        d.push(i)
        dataCl.push(d);
      }
  }

  return (
      <div>
        <Container>
            <h2>Marker Data</h2>
            <Table>
            <thead>
                <tr>
                    <th>Marker</th>
                    <th>Cluster</th>
                    <th>Humidity</th>
                    <th>Temp</th>
                    <th>Lat, Long</th>
                </tr>
            </thead>
            <tbody>
                {dataCl ? dataCl.map((dt, index) => 
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>Cluster {dt[4] + 1}</td>
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

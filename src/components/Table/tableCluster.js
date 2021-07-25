import React from 'react';
import { Table, Container, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

export default function TabelCluster({ dataCl, realtime }) {

    return (
        <div>
            <Container>
                <h2>Marker Data</h2>
                <p>Data suhu kelembaban dan lokasi yang dikirimkan oleh setiap device <i>Wireless Sensor Network</i> secara realtime dan telah diklompokan sesuai karakteristik menggunakan algoritma <i>K-Means Clustering</i>.</p>
                <Table>
                    <thead>
                        <tr>
                            <th>Marker</th>
                            <th>Cluster</th>
                            <th>Humidity</th>
                            <th>Temp</th>
                            <th>Lat, Long</th>
                            {realtime ? <th>Chart</th> : ''}
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
                                {realtime ?  
                                    <td>
                                        <Button color="primary" href={"/data-preview/" + dt[5]} size="sm" target="">
                                            <FontAwesomeIcon icon={faChartBar} size="lg" />
                                        </Button>
                                    </td>
                                : ''}
                            </tr>) 
                        : <h3> Loading Data.. </h3>} 
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

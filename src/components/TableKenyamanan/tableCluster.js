import React from 'react';
import { Table, Container, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

export default function TabelCluster({ dataCl, realtime }) {

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
                <h2>Marker Data</h2>
                <p>Data suhu kelembaban dan lokasi yang dikirimkan oleh setiap device <i>Wireless Sensor Network</i> secara realtime dan telah diklompokan sesuai karakteristik menggunakan algoritma <i>K-Means Clustering</i>. Serta Perhitungan <i>Temperature Humidity Index</i> disetiap data sensor.</p>
                <Table>
                    <thead>
                        <tr>
                            <th>Marker</th>
                            <th>Cluster</th>
                            <th>Humidity</th>
                            <th>Temp</th>
                            <th>THI* Rate</th>
                            <th>Lat, Long</th>
                            {realtime ? <th>Chart</th> : ''}
                        </tr>
                    </thead>
                    <tbody>
                        {dataCl ? dataCl.map((dt, index) => 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>Cluster {dt[4] + 1}</td>
                                <td>{String(dt[1]).substr(0,5)}%</td>
                                <td>{String(dt[0]).substr(0,5)}&deg;C</td>
                                <td>{String(0.8 * dt[0] +((dt[1]*dt[0])/500)).substr(0,5)}&deg;C 
                                    ({labelTHI(0.8 * dt[0] +((dt[1]*dt[0])/500))})</td>
                                <td>{String(dt[3]).substr(0,10)}, {String(dt[2]).substr(0,10)}</td>
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
                <p>*THI <i>Temperature Humidity Index</i> : {parmTHI}</p>
            </Container>
        </div>
    );
}

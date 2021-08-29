import React from 'react';
import { Row, Col} from 'reactstrap';

export default function TimeCard ({ label, kelembaban, suhu, thi }) {
    return(
        <div>
            <Row >
                <Col ><h2 style={{marginTop: '0px'}}><b>{label}</b></h2></Col>
                {/* <Col xs="4">icon</Col> */}
            </Row>
            <Row>
                <Col xs="6">
                    <p><h3><b>{kelembaban}</b></h3>Kelembapan</p>
                </Col>
                <Col xs="6"><p><h3><b>{suhu}</b></h3>Suhu</p></Col>
            </Row>
            <Row >
                <Col>THI : {thi}</Col>
            </Row>
        </div>
    )
}
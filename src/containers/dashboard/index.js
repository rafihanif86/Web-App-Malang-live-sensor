import React from "react";
import { Container, Row, Col } from 'reactstrap';

// core components
import IndexHeader from "../../components/Headers/IndexHeader.js";
import Data from "../../components/data";
import StaticData from "../../components/data/static";

const boxStyle = {
  display: "block", 
  marginTop: "20px", 
  borderRadius: "12px", 
  backgroundColor: "#ffffff", 
  margin: "15px", 
  padding : "5px",
  boxShadow : "0 10px 14px 0px rgb(0 0 0 / 15%)"
};

function Dashboard() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <div style={{ backgroundColor : "#f2f2f2"}}>
      <IndexHeader />
      <div >
        <Container>
          <Row style={boxStyle}>
            <Col xs="2"></Col>
            <Col xs="auto">
              <Data />
            </Col>
            <Col xs="2"></Col>
          </Row>
          <Row style={boxStyle}>
            <Col xs="2"></Col>
            <Col xs="auto">
              <StaticData />
            </Col>
            <Col xs="2"></Col>
          </Row>
        </Container>
        <br/>
      </div>
    </div>
  );
}

export default Dashboard;

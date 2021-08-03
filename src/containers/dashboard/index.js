import React, { useState } from "react";
import {  Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import classnames from 'classnames';

// core components
import IndexHeader from "../../components/Headers/IndexHeader.js";
import Data from "../../components/data/";
import Kenyamanan from "../../components/data/index1";
import StaticData from "../../components/data/static";


function Dashboard() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });

  const boxStyle = {
    display: "block", 
    marginTop: "20px", 
    borderRadius: "12px", 
    backgroundColor: "#ffffff", 
    boxShadow : "0 10px 14px 0px rgb(0 0 0 / 15%)",
    justifyContent: 'center',
    aligment : 'center'
  };

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  return (
    <div style={{ backgroundColor : "#f2f2f2"}}>
      <IndexHeader />
      <br/>
      
        <Container className="themed-container" style={boxStyle}>
          <br/>
          <Nav pills >
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                <b>Kenyamanan Kota</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                <b>Karakteristik Area</b>
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggle('3'); }}
              >
                <b>Karakteristik Static</b>
              </NavLink>
            </NavItem> */}
          </Nav>
          <br/>
        </Container>
        <Container className="themed-container" style={boxStyle}>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Kenyamanan />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Data />
              </Col>
            </Row>
          </TabPane>
          {/* <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <StaticData />
              </Col>
            </Row>
          </TabPane> */}
        </TabContent>
      </Container>
      <br/>
      <br/>
    </div>
  );
}

export default Dashboard;

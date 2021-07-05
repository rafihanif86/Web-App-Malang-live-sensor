
import React from "react";
import { connect } from "react-redux";

// reactstrap components
import { Container } from "reactstrap";

// core components

function IndexHeader(props) {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/antoine-barres.jpg").default + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Malang Live Sensors</h1>
              <div className="fog-low">
                <img
                  alt="..."
                  src={require("assets/img/fog-low.png").default}
                />
              </div>
              <div className="fog-low right">
                <img
                  alt="..."
                  src={require("assets/img/fog-low.png").default}
                />
              </div>
            </div>
            <h2 className="presentation-subtitle text-center">
              Pantau Kelembaban dan suhu Kota Malang secara <i>RealTime</i> 
            </h2>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage:
              "url(" + require("assets/img/clouds.png").default + ")",
          }}
        />
        <h6 className="category category-absolute">
          Created by Rafi Hanif Rahmadhani
          {/* <a
            href="https://www.creative-tim.com?ref=pkr-index-page"
            target="_blank"
          >
            <img
              alt="..."
              className="creative-tim-logo"
              src={require("assets/img/creative-tim-white-slim2.png").default}
            />
          </a> */}
        </h6>
      </div>
    </>
  );
}

const reduxState = (state) =>({
  popupProps: state.popup
})

export default connect(reduxState, null)(IndexHeader);

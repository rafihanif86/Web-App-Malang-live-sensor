import React from "react";

// reactstrap components

// core components
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import IndexHeader from "../../components/Headers/IndexHeader.js";
import DemoFooter from "../../components/Footers/DemoFooter.js";
import Data from "../../components/data";
import StaticData from "../../components/data/static";

function Dashboard() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <IndexNavbar />
      <IndexHeader />
      <Data />
      <StaticData />
      <DemoFooter />
    </>
  );
}

export default Dashboard;

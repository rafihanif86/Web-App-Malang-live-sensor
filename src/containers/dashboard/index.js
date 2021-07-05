import React from "react";

// reactstrap components

// core components
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import IndexHeader from "../../components/Headers/IndexHeader.js";
import DemoFooter from "../../components/Footers/DemoFooter.js";
import TabelDb from "../../components/data";

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
      <TabelDb />
      <DemoFooter />
    </>
  );
}

export default Dashboard;

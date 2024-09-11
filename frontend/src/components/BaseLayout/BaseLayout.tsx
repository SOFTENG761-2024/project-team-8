import { Outlet } from "react-router-dom";
import classes from "./BaseLayout.module.css";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Container } from "@mantine/core";
import logo from '../../assets/logo.png';

const BaseLayout = () => {
  return (
    <Container fluid className={classes.layoutWrapper}>
      <div className={classes.headerContentWrapper}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>
        <div className={classes.headerContent}>
          <Header />
        </div>
      </div>
      <div className={classes.horizontalWrapper}>
        <Navbar />
        <main className={classes.mainContentWrapper}>
          <div className={classes.mainContent}>
            <Outlet />
          </div>
        </main>
      </div>
      <div className={classes.footerWrapper}>

      </div>

    </Container>
    
  );
};

export default BaseLayout;

import { Outlet } from "react-router-dom";
import classes from "./BaseLayout.module.css";
import Navbar from "../Navbar/Navbar";
import { Container } from "@mantine/core";
import logo from '../../assets/logo.png';

const BaseLayout = () => {
  return (
    <Container fluid className={classes.layoutWrapper}>
      <div className={classes.headerContentWrapper}>
        <div className={classes.logoImage}>
          <img src={logo} alt="Centered" style={{ maxWidth: '100%', height: '100%' }} />
        </div>
        <div className={classes.headerContent}></div>
      </div>
      <Navbar />
      <main className={classes.mainContentWrapper}>
        <div className={classes.mainContent}>
          <Outlet />
        </div>
      </main>

    </Container>
    
  );
};

export default BaseLayout;

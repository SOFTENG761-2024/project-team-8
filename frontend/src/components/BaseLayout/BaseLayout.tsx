import { Outlet } from "react-router-dom";
import classes from "./BaseLayout.module.css";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Box, Divider, Image } from "@mantine/core";
import logo from "../../assets/logo.png";

const BaseLayout = () => {
  return (
    <Box className={classes.layoutWrapper}>
      <div className={classes.headerContentWrapper}>
        <div className={classes.logoImage}>
          <Image src={logo} alt="ByteEd" h={120} />
        </div>
        <div className={classes.headerContent}>
          <Header />
        </div>
      </div>
      <div className={classes.divider} />
      <div className={classes.horizontalWrapper}>
        <Navbar />
        <main className={classes.mainContentWrapper}>
          <Outlet />
        </main>
      </div>
    </Box>
  );
};

export default BaseLayout;

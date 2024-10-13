import { Box, Image } from "@mantine/core";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import classes from "./BaseLayout.module.css";

/**
 * @component
 * BaseLayout
 *
 * This component is the base layout of the entire app,
 * setting the header, main content and navbar to desired location on screen
 */
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

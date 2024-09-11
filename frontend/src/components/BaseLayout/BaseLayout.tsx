import { Outlet } from "react-router-dom";
import classes from "./BaseLayout.module.css";
import Navbar from "../Navbar/Navbar";

const BaseLayout = () => {
  return (
    <div className={classes.layoutWrapper}>
      <Navbar />
      <main className={classes.mainContentWrapper}>
        <div className={classes.mainContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;

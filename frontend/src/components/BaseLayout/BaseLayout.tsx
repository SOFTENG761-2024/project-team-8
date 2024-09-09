import { Outlet } from "react-router-dom";
import classes from "./BaseLayout.module.css";

const BaseLayout = () => {
  return (
    <div className={classes.layoutWrapper}>
      <main className={classes.mainContentWrapper}>
        <div className={classes.mainContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;

import { Container } from "@mantine/core";
import classes from "./Header.module.css";
import { IconUserFilled } from "@tabler/icons-react";
import explorer from "../../assets/explorer.png";
import { useEffect, useState } from "react";

const Header = () => {
  const [page, setPage] = useState("");
  useEffect(() => {
    determinePage();
  }, [location.pathname]);

  const determinePage = () => {
    const path = location.pathname;
    if (path === "/") {
      setPage("Dashboard");
    } else if (path === "/dashboard-test") {
      setPage("Demo Dashboard");
    } else if (path.startsWith("/courses/")) {
      // Use startsWith for dynamic segments
      setPage("Course");
      // } else if (path === "/admin/create-lesson") {
      //   setPage("Create Lesson");
    } else {
      setPage("");
    }
  };

  return (
    <Container fluid className={classes.headerWrapper}>
      <div className={classes.detailsWrapper}>
        <img src={explorer} alt="Centered" style={{ maxWidth: "70px" }} />
        <text className={classes.largeBoldText}>{page}</text>
      </div>
      <div className={classes.detailsWrapper}>
        <IconUserFilled size={50} />
        <div className={classes.nameWrapper}>
          <text className={classes.text}>Hello,</text>
          <text className={classes.boldText}>Username</text>
        </div>
      </div>
    </Container>
  );
};

export default Header;

import { Avatar, Container, Text } from "@mantine/core";
import classes from "./Header.module.css";
import explorer from "../../assets/explorer.png";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";

const Header = () => {
  const { currentUserData } = useContext(AuthContext);
  const name = currentUserData?.attributes.username;
  const location = useLocation();
  const [page, setPage] = useState("");
  useEffect(() => {
    determinePage();
  }, [location.pathname]);

  const determinePage = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) {
      setPage("Dashboard");
    } else if (path.includes("courses")) {
      setPage("Course Details");
    } else if (path.includes("browse")) {
      setPage("Browse Unsubscribed Courses");
    } else {
      // CAN ADD MORE!
      setPage("");
    }
  };

  return (
    <Container fluid className={classes.headerWrapper}>
      <div className={classes.detailsWrapper}>
        <img src={explorer} alt="Centered" style={{ maxWidth: "4rem" }} />
        <Text fw={700} size="2.1rem" c="primary.4">
          {page}
        </Text>
      </div>
      <div className={classes.detailsWrapper}>
        <Avatar
          size={50}
          key={name}
          name={name}
          color="initials"
          allowedInitialsColors={["primary.4"]}
        />
        <div className={classes.nameWrapper}>
          <Text size="1.125rem" c="primary.4">
            Hello,
          </Text>
          <Text fw={700} size="1.125rem" c="primary.4">
            {currentUserData?.attributes.username}
          </Text>
        </div>
      </div>
    </Container>
  );
};

export default Header;

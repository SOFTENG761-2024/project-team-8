import { Avatar, Container, Text, Image } from "@mantine/core";
import classes from "./Header.module.css";
import explorer from "../../assets/explorer.png";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";

/**
 * @component
 * Header
 *
 * This component is for the header section of the user dashboard,
 * displaying the page title and user details
 * 
 * @returns {JSX.Element}
 */
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
    if (path === "/user/dashboard") {
      setPage("Dashboard");
    } else if (path.startsWith("/user/courses")) {
      setPage("Course Details");
    } else if (path === "/user/bookmarks") {
      setPage("Bookmarked Courses");
    } else if (path === "/user/browse") {
      setPage("Browse Unsubscribed Courses");
    } else {
      setPage("Page Not Found");
    }
  };

  return (
    <Container fluid className={classes.headerWrapper}>
      <div className={classes.detailsWrapper}>
        <Image src={explorer} alt="Centered" h={90} />
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

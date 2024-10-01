import { ActionIcon, rem, Stack, Text, Divider } from "@mantine/core";
import classes from "./NavBar.module.css";
import {
  IconBookmarkFilled,
  IconChevronRight,
  IconHomeFilled,
  IconLogout,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";

interface NavbarLinkProps {
  icon: typeof IconHomeFilled;
  label: string;
  active?: boolean;
  expanded?: boolean;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  expanded = true,
}: NavbarLinkProps) {
  const iconSize = rem("calc(4vw + 12px)");

  return (
    <div
      className={`${classes.link} ${expanded ? classes.linkExpanded : ""} ${active ? classes.linkActive : ""}`}
    >
      <ActionIcon
        variant="transparent"
        data-active={active || undefined}
        className={classes.linkIcon}
      >
        <Icon style={{ width: iconSize, height: iconSize }} stroke={3} />
      </ActionIcon>

      {expanded && (
        <Text
          className={`${classes.text} ${!expanded ? classes.textCollapsed : ""}`}
        >
          {label}
        </Text>
      )}
    </div>
  );
}

const Navbar = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const location = useLocation();
  const { clearStoredUserData } = useContext(AuthContext);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const links = [{ icon: IconHomeFilled, label: "Dashboard", path: "/user" }, { icon: IconBookmarkFilled, label: "Bookmarks", path: "/user/bookmarks" }];
  const navbarItems = links.map((link) => {
    // e.g. /user/dashboard
    const pathWithLabel = `${link.path}/${link.label.toLowerCase()}`;

    // checks if current path matches the link's path or subpath
    const isActive =
      location.pathname === link.path ||
      location.pathname.startsWith(pathWithLabel);

    return (
      <Link
        key={link.label}
        to={isActive ? "#" : link.path} // disable navigation if already on the active page (to avoid page reload)
        style={{ textDecoration: "none" }}
      >
        <NavbarLink {...link} expanded={expanded} active={isActive} />
      </Link>
    );
  });

  const logout = () => {
    clearStoredUserData();
    sessionStorage.removeItem("sessionToken");
  };
  return (
    <nav
      className={`${classes.navbar} ${expanded ? classes.navbarExpanded : classes.navbarCollapsed}`}
    >
      <Text className={classes.menuHeading}>MENU</Text>
      <ActionIcon className={classes.expandIcon} onClick={toggleExpand}>
        <IconChevronRight />
      </ActionIcon>
      <Stack gap="2vh" className={classes.navbarMain}>
        {navbarItems}
      </Stack>

      <Stack gap="1vh" style={{ width: "100%" }}>
        <Divider color="primary.3" />
        <Link
          to="/login"
          style={{ textDecoration: "none" }}
          onClick={() => logout()}
        >
          <NavbarLink
            key={"Logout"}
            expanded={expanded}
            icon={IconLogout}
            label={"Logout"}
          />
        </Link>
      </Stack>
    </nav>
  );
};

export default Navbar;

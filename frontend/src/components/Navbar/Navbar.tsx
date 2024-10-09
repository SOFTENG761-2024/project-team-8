import { ActionIcon, rem, Stack, Text, Divider, Tooltip } from "@mantine/core";
import classes from "./NavBar.module.css";
import {
  IconBookmarkFilled,
  IconChevronRight,
  IconHomeFilled,
  IconLogout,
  IconBookFilled,
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
      {expanded ? (
        <ActionIcon
          variant="transparent"
          data-active={active || undefined}
          className={classes.linkIcon}
        >
          <Icon style={{ width: iconSize, height: iconSize }} stroke={3} />
        </ActionIcon>
      ) : (
        <Tooltip
          label={label}
          position="right"
          arrowOffset={10}
          arrowSize={5}
          withArrow
          color="neutral.5"
          offset={15}
        >
          <ActionIcon
            variant="transparent"
            data-active={active || undefined}
            className={classes.linkIcon}
          >
            <Icon style={{ width: iconSize, height: iconSize }} stroke={3} />
          </ActionIcon>
        </Tooltip>
      )}

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
  const links = [
    { icon: IconHomeFilled, label: "Dashboard", path: "/user" },
    { icon: IconBookmarkFilled, label: "Bookmarks", path: "/user/bookmarks" },
    { icon: IconBookFilled, label: "Browse", path: "/user/browse" },
  ];
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
      <Tooltip
        label={expanded ? "Collapse Navbar" : "Open Navbar"}
        transitionProps={{ transition: "fade-right", duration: 250 }}
        position="right"
        color="neutral.5"
        offset={10}
      >
        <ActionIcon className={classes.expandIcon} onClick={toggleExpand}>
          <IconChevronRight />
        </ActionIcon>
      </Tooltip>
      <Stack gap="2vh" className={classes.navbarMain}>
        {navbarItems}
      </Stack>

      <Stack gap="1vh" style={{ width: "100%" }}>
        <Divider color="primary.3" />
        {expanded ? (
          // Render without Tooltip when expanded is true
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
        ) : (
          // renders with Tooltip when navbar is collapsed
          <Tooltip
            label="Log Out"
            transitionProps={{ transition: "fade-right", duration: 250 }}
            position="right"
            color="neutral.5"
            offset={10}
          >
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
          </Tooltip>
        )}
      </Stack>
    </nav>
  );
};

export default Navbar;

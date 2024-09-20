import { ActionIcon, rem, Stack, Text, Divider } from "@mantine/core";
import classes from "./NavBar.module.css";
import {
  IconChevronRight,
  IconHomeFilled,
  IconLogout,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Tooltip } from "@mantine/core";

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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const links = [{ icon: IconHomeFilled, label: "Dashboard", path: "/user" }];
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
  return (
    <nav
      className={`${classes.navbar} ${expanded ? classes.navbarExpanded : classes.navbarCollapsed}`}
    >
      <Text className={classes.menuHeading}>MENU</Text>
      <Tooltip label={expanded ? "Collapse Navbar" : "Open Navbar"} transitionProps={{ transition: 'fade-right', duration: 250 }} position="right" offset={10}>
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
          <Link to="/login" style={{ textDecoration: "none" }}>
            <NavbarLink
              key={"Logout"}
              expanded={expanded}
              icon={IconLogout}
              label={"Logout"}
            />
          </Link>
        ) : (
          // renders with Tooltip when navar is collapsed
          <Tooltip label="Log Out" transitionProps={{ transition: 'fade-right', duration: 250 }} position="right" offset={10}>
            <Link to="/login" style={{ textDecoration: "none" }}>
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
    </nav >
  );
};

export default Navbar;

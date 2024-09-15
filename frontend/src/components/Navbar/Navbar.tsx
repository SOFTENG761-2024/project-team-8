import { ActionIcon, rem, Stack, Text, Divider } from "@mantine/core";
import classes from "./NavBar.module.css";
import {
  IconChevronRight,
  IconHomeFilled,
  IconLogout,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";

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
    <div className={`${classes.link} ${expanded ? classes.linkExpanded : ""}`}>
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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const links = [{ icon: IconHomeFilled, label: "Dashboard", path: "/user" }];
  const navbarItems = links.map((link) => (
    <Link to={link.path} style={{ textDecoration: "none" }}>
      <NavbarLink key={link.label} {...link} expanded={expanded} />
    </Link>
  ));
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
        <Divider color="neutral.1" />
        <Link to="/login" style={{ textDecoration: "none" }}>
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

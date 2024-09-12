import { ActionIcon, rem, Stack, Text, Divider } from "@mantine/core";
import classes from "./NavBar.module.css";
import {
  IconChevronRight,
  IconHomeFilled,
  IconLogout,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface NavbarLinkProps {
  icon: typeof IconHomeFilled;
  label: string;
  active?: boolean;
  expanded?: boolean;
  onClick?: () => void;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  expanded = true,
}: NavbarLinkProps) {
  const iconSize = rem("calc(4vw + 12px)");

  return (
    <div className={`${classes.link} ${expanded ? classes.linkExpanded : ""}`}>
      <ActionIcon
        onClick={onClick}
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
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const links = [{ icon: IconHomeFilled, label: "Dashboard", path: "/" }];
  const navbarItems = links.map((link) => (
    <NavbarLink
      key={link.label}
      {...link}
      onClick={() => navigate(link.path)}
      expanded={expanded}
    />
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
        <NavbarLink
          key={"Logout"}
          onClick={() => console.log("TODO: logout functionality here")}
          expanded={expanded}
          icon={IconLogout}
          label={"Logout"}
        />
      </Stack>
    </nav>
  );
};

export default Navbar;

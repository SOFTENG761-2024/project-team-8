import { ActionIcon, rem, Stack, Tooltip, Text } from "@mantine/core";
import classes from "./NavBar.module.css";
import {
  IconChevronLeft,
  IconChevronRight,
  IconHomeFilled,
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
  const iconSize = rem("calc(1.5vw + 4px)");

  return (
    <div className={classes.link}>
      <ActionIcon
        onClick={onClick}
        variant="transparent"
        data-active={active || undefined}
        className={classes.linkIcon}
      >
        <Icon style={{ width: iconSize, height: iconSize }} stroke={3} />
      </ActionIcon>
      {expanded && <Text>{label}</Text>}
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
      className={`${classes.navbar} ${expanded ? classes.navbarExpanded : ""}`}
    >
      <ActionIcon className={classes.expandIcon} onClick={toggleExpand}>
        {expanded ? <IconChevronLeft /> : <IconChevronRight />}
      </ActionIcon>
      <Stack gap="2vh" className={classes.navbarMain}>
        {navbarItems}
      </Stack>
    </nav>
  );
};

export default Navbar;

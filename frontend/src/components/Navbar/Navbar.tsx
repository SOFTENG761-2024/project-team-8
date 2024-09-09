import { ActionIcon, rem, Stack, Tooltip } from "@mantine/core";
import classes from "./NavBar.module.css";
import { IconHomeFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface NavbarLinkProps {
  icon: typeof IconHomeFilled;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const iconSize = rem("calc(1.5vw + 4px)");

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <ActionIcon
        onClick={onClick}
        variant="transparent"
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: iconSize, height: iconSize }} stroke={3} />
      </ActionIcon>
    </Tooltip>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const links = [{ icon: IconHomeFilled, label: "Dashboard", path: "/" }];
  const navbarItems = links.map((link) => (
    <NavbarLink key={link.label} {...link} onClick={() => navigate(link.path)} />
  ));
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack gap="2vh">{navbarItems}</Stack>
      </div>
    </nav>
  );
};

export default Navbar;

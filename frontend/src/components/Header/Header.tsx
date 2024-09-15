import { Container } from "@mantine/core"
import classes from "./Header.module.css";
import {
  IconUserFilled
} from "@tabler/icons-react";
import explorer from '../../assets/explorer.png';
import { Text } from '@mantine/core';

const Header = () => {
  return (
    <Container fluid className={classes.headerWrapper}>
      <div className={classes.detailsWrapper}>
      <img src={explorer} alt="Centered" style={{ maxWidth: '4rem' }} />
      <Text fw={700} size="2.1rem" c="primary.4">[Page Description]</Text>
      </div>
      <div className={classes.detailsWrapper}>
        <IconUserFilled size={50}/>
        <div className={classes.nameWrapper}>
          <Text size="1.125rem" c="primary.4">
            Hello,
          </Text>
          <Text fw={700} size="1.125rem" c="primary.4">
            Username
          </Text>
        </div>
      </div>
    </Container>
  )
}

export default Header;
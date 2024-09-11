import { Container } from "@mantine/core"
import classes from "./Header.module.css";
import {
  IconUserFilled
} from "@tabler/icons-react";
import explorer from '../../assets/explorer.png';

const Header = () => {
  return (
    <Container className={classes.headerWrapper}>
      <div className={classes.detailsWrapper}>
      <img src={explorer} alt="Centered" style={{ maxWidth: '70px' }} />
      <text className={classes.largeBoldText}>[Page Description]</text>
      </div>
      <div className={classes.detailsWrapper}>
        <IconUserFilled size={50}/>
        <div className={classes.nameWrapper}>
          <text className={classes.text}>
            Hello,
          </text>
          <text className={classes.boldText}>
            Username
          </text>
        </div>
      </div>
    </Container>
  )
}

export default Header;
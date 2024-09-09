import { FC, ReactElement, useState } from "react";
import Parse from "../../../parseconfig.ts";
import {
  Text,
  Button,
  Center,
  Container,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
} from "@mantine/core";

export const UserLogin: FC = (): ReactElement => {
  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<
    Parse.Object | null | undefined
  >(null);

  const doUserLogIn = async function (): Promise<boolean> {
    const usernameValue: string = username;
    const passwordValue: string = password;
    try {
      const loggedInUser: Parse.User = await Parse.User.logIn(
        usernameValue,
        passwordValue
      );
      // logIn returns the corresponding ParseUser object
      alert(
        `Success! User ${loggedInUser.get("username")} has successfully signed in!`
      );
      // To verify that this is in fact the current user, `current` can be used
      const currentUser: Parse.User | undefined = Parse.User.current();
      console.log(loggedInUser === currentUser);
      // Clear input fields
      setUsername("");
      setPassword("");
      // Update state variable holding current user
      getCurrentUser();
      return true;
    } catch (error: Parse.Error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  // Function that will return current user and also update current username
  const getCurrentUser = async function (): Promise<
    Parse.User | null | undefined
  > {
    const currentUser: Parse.User | null | undefined =
      await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };
  console.log(currentUser);

  return (
    <Center bg="primary.3" h="100vh" w="100vw">
      <Paper bg="neutral.0" shadow="lg" w="600" p={50} radius="md">
        <Title ta="center" size="h1" c="primary.4">
          Login
        </Title>

        <Container mt={25}>
          <TextInput
            label="Username"
            placeholder="Your username"
            variant="filled"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            variant="filled"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox c="neutral.4" label="Remember me" />
            <Anchor
              c="primary.5"
              size="textSm"
              component="a"
              ml={5}
              underline="always"
            >
              Forgot password?
            </Anchor>
          </Group>
        </Container>
        <Center>
          <Button
            variant="filled"
            px="100"
            mt="xl"
            onClick={() => doUserLogIn()}
          >
            Sign in
          </Button>
        </Center>
        <Text c="neutral.4" size="textSm" ta="center" mt="xl">
          Don't have an account?
          <Anchor
            c="primary.5"
            size="textSm"
            component="a"
            ml={5}
            underline="always"
          >
            Sign up
          </Anchor>
        </Text>
      </Paper>
    </Center>
  );
};

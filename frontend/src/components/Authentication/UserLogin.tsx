import { FC, FormEvent, useState } from "react";
import Parse from "../../../parseconfig.ts";
import {
  Text,
  Button,
  Center,
  Container,
  Anchor,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const UserLogin: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<
    Parse.Object | null | undefined
  >(null);
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const doUserLogIn = async function (event: FormEvent): Promise<void> {
    setIsLoading(true);
    event.preventDefault();
    const usernameValue: string = username;
    const passwordValue: string = password;
    try {
      // logIn will return the corresponding ParseUser object if it exists
      const loggedInUser: Parse.User = await Parse.User.logIn(
        usernameValue,
        passwordValue
      );
      // We can verify that the logged in user is the current user
      const currentUser: Parse.User | undefined = Parse.User.current();
      console.log(loggedInUser === currentUser);
      // Clear input fields
      setUsername("");
      setPassword("");
      getCurrentUser();
      setIsLoading(false);
      // Navigate to dashboard on successful login
      navigate("/");
    } catch (error: Parse.Error) {
      setIsLoading(false);
      if (!error.message.includes("password")) {
        setUsernameError(error.message);
      } else if (!error.message.includes("username")) {
        setPasswordError(error.message);
      } else {
        setUsernameError(" ");
        setPasswordError("Invalid username or password, please try again.");
      }
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

  // to use the unused variable
  if (currentUser) {
    console.log(currentUser);
  }

  return (
    <>
      <form onSubmit={(event: FormEvent) => doUserLogIn(event)}>
        <Container mt={25}>
          <TextInput
            label="Username"
            placeholder="Your username"
            variant="filled"
            value={username}
            error={usernameError}
            onChange={(event) => {
              setUsername(event.target.value);
              setUsernameError("");
              setPasswordError("");
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            variant="filled"
            value={password}
            error={passwordError}
            onChange={(event) => {
              setPassword(event.target.value);
              setUsernameError("");
              setPasswordError("");
            }}
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
            loading={isLoading}
            type="submit"
          >
            Sign in
          </Button>
        </Center>
      </form>
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
    </>
  );
};

export default UserLogin;

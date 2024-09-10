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
  const navigate = useNavigate();

  const savedUsername = localStorage.getItem("savedUsername");
  const [username, setUsername] = useState<string>(savedUsername || "");
  const [rememberMe, setRememberMe] = useState<boolean>(!!savedUsername);
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const doUserLogIn = async function (event: FormEvent): Promise<void> {
    setIsLoading(true);
    event.preventDefault();
    const usernameValue: string = username;
    const passwordValue: string = password;

    // store username if "remember me" is selected
    if (rememberMe) {
      localStorage.setItem("savedUsername", username);
    } else {
      localStorage.removeItem("savedUsername");
    }

    try {
      // logIn will return the corresponding ParseUser object if it exists
      const loggedInUser: Parse.User = await Parse.User.logIn(
        usernameValue,
        passwordValue
      );
      // logIn returns the corresponding ParseUser object
      // To verify that this is in fact the current user, `current` can be used
      const currentUser: Parse.User | undefined = Parse.User.current();
      console.log(loggedInUser === currentUser);

      setUsername("");
      setPassword("");
      setIsLoading(false);

      // Navigate to dashboard on successful login
      navigate("/");
    } catch {
      setIsLoading(false);

      if (usernameValue.trim() === "") {
        setUsernameError("Username is required.");
      } else if (passwordValue.trim() === "") {
        setPasswordError("Password is required.");
      } else {
        setUsernameError(" ");
        setPasswordError("Invalid username or password, please try again.");
      }
    }
  };

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
            <Checkbox
              c="neutral.4"
              label="Remember me"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
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

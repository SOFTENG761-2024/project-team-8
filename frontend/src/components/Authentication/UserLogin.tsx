import { FC, useState } from "react";
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
import { useForm } from "@mantine/form";

const UserLogin: FC = () => {
  const navigate = useNavigate();
  const savedUsername = localStorage.getItem("savedUsername");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: savedUsername || "",
      password: "",
      rememberMe: !!savedUsername,
    },
    validate: {
      username: (value) => (!value ? "Username is required." : null),
      password: (value) => (!value ? "Password is required." : null),
    },
  });

  const doUserLogIn = async function ({
    username,
    password,
    rememberMe,
  }: {
    username: string;
    password: string;
    rememberMe: boolean;
  }): Promise<void> {
    setIsLoading(true);

    // store username if "remember me" is selected
    if (rememberMe) {
      localStorage.setItem("savedUsername", username);
    } else {
      localStorage.removeItem("savedUsername");
    }

    try {
      // logIn will return the corresponding ParseUser object if it exists
      const loggedInUser: Parse.User = await Parse.User.logIn(
        username,
        password
      );
      // logIn returns the corresponding ParseUser object
      // To verify that this is in fact the current user, `current` can be used
      const currentUser: Parse.User | undefined = Parse.User.current();
      console.log(loggedInUser === currentUser);

      setIsLoading(false);
      // Navigate to dashboard on successful login
      navigate("/user");
    } catch {
      setIsLoading(false);
      loginForm.setErrors({
        username: " ",
        password: "Invalid username or password, please try again.",
      });
    }
  };

  return (
    <>
      <form onSubmit={loginForm.onSubmit((values) => doUserLogIn(values))}>
        <Container mt={25}>
          <TextInput
            label="Username"
            placeholder="Your username"
            variant="filled"
            {...loginForm.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            variant="filled"
            {...loginForm.getInputProps("password")}
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              c="neutral.4"
              label="Remember me"
              {...loginForm.getInputProps("rememberMe", { type: "checkbox" })}
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
          onClick={() => navigate("/register")}
        >
          Sign up
        </Anchor>
      </Text>
    </>
  );
};

export default UserLogin;

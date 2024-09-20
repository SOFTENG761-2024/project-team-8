import { FC, useContext, useEffect, useState } from "react";
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
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider.tsx";

const APP_ID = import.meta.env.VITE_BACK4APP_APP_ID;

/**
 * User Login Component
 *
 * This component handles the logic to interact with the backend to log a user in.
 * It also handles form errors and validation for users when trying to log in.
 * It will redirect users to the dashboard upon successful login.
 *
 */
const UserLogin: FC = () => {
  const navigate = useNavigate();
  const savedUsername = localStorage.getItem("savedUsername");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { clearStoredData, setCurrentUserData } = useContext(AuthContext);

  const loginForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: savedUsername || "",
      password: "",
      rememberMe: !!savedUsername,
    },
    validate: {
      username: (value) =>
        value.trim().length === 0 ? "Username is required." : null,
      password: (value) =>
        value.trim().length === 0 ? "Password is required." : null,
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

    // Store username if "remember me" is selected
    if (rememberMe) {
      localStorage.setItem("savedUsername", username);
    } else {
      localStorage.removeItem("savedUsername");
    }

    try {
      // Note that logIn can also return the corresponding ParseUser object if login is successful
      // To verify the current user `Parse.User.current();` can be used
      await Parse.User.logIn(username, password).then(() => {
        localStorage.removeItem(`Parse/${APP_ID}/currentUser`);
        const currentUser = Parse.User.current();

        if (currentUser) {
          const userData = {
            id: currentUser.id,
            username: currentUser.attributes.email,
            role: currentUser.attributes.role,
          };

          setCurrentUserData(userData);
        }
      });

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

  useEffect(() => {
    clearStoredData();
  }, []);

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
            px="6rem"
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

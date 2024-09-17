import { FC, useState } from "react";
import Parse from "../../../parseconfig.ts";
import { useForm } from "@mantine/form";
import {
  Anchor,
  Button,
  Center,
  Container,
  PasswordInput,
  TextInput,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

/**
 * User Registration Component
 *
 * This component handles the logic to interact with the backend to create a new user account.
 * It also handles form errors and validation for users when creating an account.
 * It will redirect users to the dashboard upon successful sign up.
 *
 */
const UserRegister: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.trim().length === 0 ? "Username must not be empty." : null,
      email: (value) =>
        value.trim().length === 0 ? "Email must not be empty." : null,
      password: (value) =>
        value.trim().length < 5
          ? "Password must be 5 characters or more."
          : null,
    },
  });

  const checkFieldError = (fieldName: string, errorMessage: string) => {
    return errorMessage.toLocaleLowerCase().includes(fieldName);
  };

  const handleSignup = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    const user = new Parse.User();
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(email);

    try {
      await user.signUp();
      setIsLoading(false);
      // Navigate to dashboard on successful creation
      navigate("/user");
    } catch (err: unknown) {
      const error = err as Parse.Error;
      setIsLoading(false);

      let hasFieldError = false;
      // loop through fields to see if any have resulted in an error and render this
      ["username", "email", "password"].forEach((field) => {
        if (checkFieldError(field, error.message)) {
          registerForm.setFieldError(field, error.message);
          hasFieldError = true;
        }
      });
      // if no field-specific errors, set a generic error
      if (!hasFieldError) {
        registerForm.setErrors({
          username: " ",
          email: " ",
          password:
            "Something went wrong when making your account, please try again.",
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={registerForm.onSubmit((values) => handleSignup(values))}>
        <Container mt={25}>
          <TextInput
            label="Username"
            placeholder="Username"
            variant="filled"
            {...registerForm.getInputProps("username")}
            withAsterisk
          />
          <TextInput
            label="Email"
            placeholder="Email address"
            variant="filled"
            {...registerForm.getInputProps("email")}
            mt="md"
            withAsterisk
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            variant="filled"
            {...registerForm.getInputProps("password")}
            mt="md"
            withAsterisk
          />
        </Container>
        <Center>
          <Button
            variant="filled"
            px="6rem"
            mt="xl"
            loading={isLoading}
            type="submit"
          >
            Sign up
          </Button>
        </Center>
      </form>
      <Text c="neutral.4" size="textSm" ta="center" mt="xl">
        Already have an account?
        <Anchor
          c="primary.5"
          size="textSm"
          component="a"
          ml={5}
          underline="always"
          onClick={() => navigate("/login")}
        >
          Login
        </Anchor>
      </Text>
    </>
  );
};

export default UserRegister;
